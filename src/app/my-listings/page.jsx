"use client";

import { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";
import Image from "next/image";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { getMyRooms, deleteRoom } from "@/lib/action";
import { FiEdit2, FiTrash2 } from "react-icons/fi";

const MyListingsPage = () => {
  const { data: session } = authClient.useSession();
  const user = session?.user;

  const router = useRouter();

  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      if (!user?.id) return;

      try {
        const data = await getMyRooms(user.id);
        setRooms(data);
      } catch (err) {
        toast.error("Failed to load your listings");
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [user]);

  const handleDelete = async (roomId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this room?"
    );

    if (!confirmDelete) return;

    try {
      await deleteRoom(roomId, user.id);

      setRooms((prev) =>
        prev.filter((room) => room._id !== roomId)
      );

      toast.success("Room deleted successfully");
    } catch (err) {
      toast.error("Failed to delete room");
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <p className="text-red-500 text-lg font-medium">
          Please login first
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-yellow-50 to-yellow-50 px-4 py-12">
      <div className="max-w-7xl mx-auto">

        
        <div className="mb-6 flex flex-col items-center text-center">
          <h1 className="text-3xl font-bold text-[#0f172a]">
            My Listings
          </h1>
          <p className="mt-2 text-slate-500">
            Manage all your created study rooms
          </p>
        </div>

        
        {loading && (
          <div className="text-center text-slate-500">
            Loading your listings...
          </div>
        )}

        {/* Empty */}
        {!loading && rooms.length === 0 && (
          <div className="text-center mt-20">
            <p className="text-slate-500 text-lg">
              You haven't added any rooms yet.
            </p>

            <button
              onClick={() => router.push("/add-room")}
              className="mt-5 bg-slate-900 text-white px-6 py-2 rounded-lg hover:bg-slate-800 transition"
            >
              Add Your First Room
            </button>
          </div>
        )}

        
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

          {rooms.map((room, index) => (
            <motion.div
              key={room._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="rounded-2xl overflow-hidden bg-white border border-slate-200 shadow-sm hover:shadow-xl hover:-translate-y-1 transition"
            >

        
              <div className="relative h-[190px] overflow-hidden">
                <Image
                  src={room.image}
                  alt={room.roomName}
                  fill
                  className="object-cover transition-transform duration-300 hover:scale-105"
                />
              </div>

            
              <div className="p-5">

                <h2 className="text-lg font-bold text-slate-800">
                  {room.roomName}
                </h2>

                <p className="mt-2 text-sm text-slate-500 line-clamp-2">
                  {room.description}
                </p>

                <div className="mt-3 text-sm text-slate-500">
                  Floor: <span className="font-medium text-slate-700">{room.floor}</span>
                </div>

                <div className="text-sm text-slate-500">
                  Capacity: <span className="font-medium text-slate-700">{room.capacity}</span>
                </div>

                <div className="mt-3 text-lg font-bold text-emerald-600">
                  ${room.hourlyRate}/hr
                </div>

            
                <div className="mt-3 flex flex-wrap gap-2">
                  {room.amenities?.slice(0, 3).map((a, i) => (
                    <span
                      key={i}
                      className="text-xs px-2 py-1 bg-slate-100 text-slate-600 rounded-full"
                    >
                      {a}
                    </span>
                  ))}

                  {room.amenities?.length > 3 && (
                    <span className="text-xs px-2 py-1 bg-slate-200 text-slate-600 rounded-full">
                      +{room.amenities.length - 3}
                    </span>
                  )}
                </div>

          
                <div className="mt-5 flex gap-2">

                  <button
                      onClick={() => router.push(`/rooms/${room._id}/edit`)}
                      className="flex-1 flex items-center justify-center gap-1.5 bg-slate-900 text-white py-2 rounded-lg hover:bg-slate-800 transition"
>
                   <FiEdit2 size={14} />
                    Edit
                    </button>

                  <button
               onClick={() => handleDelete(room._id)}
               className="flex-1 flex items-center justify-center gap-1.5 bg-red-400 text-white py-2 rounded-lg hover:bg-red-700 transition"
>
                <FiTrash2 size={14} />
                 Delete
              

                </div>

              </div>
            </motion.div>
          ))}

        </div>
      </div>
    </div>
  );
};

export default MyListingsPage;