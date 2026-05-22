"use client";

import { useEffect, useState } from "react";
import { LuLoader, LuSearchX } from "react-icons/lu";
import { UpdateModal } from "@/components/UpdateModal";
import { DeleteAlert } from "@/components/DeleteAlert";

const AdminRoomsPage = () => {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.title = "Admin - Room Management";
    fetchRooms();
  }, []);

  const fetchRooms = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/room`, { cache: "no-store" });
      const data = await res.json();
      setRooms(data);
    } catch {
      setRooms([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#070b18] via-[#0f172a] to-black px-4 py-10">
      <div className="max-w-6xl mx-auto">

        <div className="text-center mb-8">
          <h1 className="text-4xl sm:text-5xl font-semibold text-[#f5ecd7]">
  Manage Your <span className="text-[#d8c08c] italic">Spaces</span>
</h1>

<p className="text-white/40 mt-2 text-sm">
  Track room information, capacity, pricing, and bookings efficiently
</p>
        </div>

        {loading && (
          <div className="flex flex-col items-center justify-center py-20 text-white/40 gap-3">
            <LuLoader className="text-4xl animate-spin text-[#d8c08c]" />
            <p className="text-xs">loading rooms...</p>
          </div>
        )}

        {!loading && rooms.length === 0 && (
          <div className="text-center py-20">
            <LuSearchX className="text-5xl text-white/20 mx-auto mb-3" />
            <h2 className="text-lg font-semibold text-[#f5ecd7]">no rooms found</h2>
            <p className="text-white/40 mt-1 text-xs">add a room to get started</p>
          </div>
        )}

        {!loading && rooms.length > 0 && (
          <>
            <div className="hidden md:block bg-[rgba(10,20,45,0.92)] border border-yellow-500/20 rounded-2xl overflow-hidden backdrop-blur-xl">
              <div className="grid grid-cols-[2fr_1fr_1fr_1fr_auto] gap-4 px-6 py-4 border-b border-yellow-500/20 text-[11px] font-bold text-[#d8c08c] uppercase tracking-widest">
                <span>Room Name</span>
                <span>Floor</span>
                <span>Capacity</span>
                <span>Hourly Rate</span>
                <span>Actions</span>
              </div>

              {rooms.map((room, index) => (
                <div
                  key={room._id}
                  className={`grid grid-cols-[2fr_1fr_1fr_1fr_auto] gap-4 px-6 py-4 items-center transition-colors duration-150 hover:bg-white/5 ${index !== rooms.length - 1 ? "border-b border-yellow-500/10" : ""}`}
                >
                  <span className="font-semibold text-[#f5ecd7] text-sm">{room.roomName}</span>
                  <span className="text-white/50 text-xs">{room.floor}</span>
                  <span className="text-white/50 text-xs">{room.capacity} People</span>
                  <span className="text-[#d8c08c] font-semibold text-xs">${room.hourlyRate}/hr</span>
                  <div className="flex items-center gap-2">
                    <UpdateModal room={room} />
                    <DeleteAlert room={room} />
                  </div>
                </div>
              ))}
            </div>

            <div className="md:hidden flex flex-col gap-4">
              {rooms.map((room) => (
                <div key={room._id} className="bg-[rgba(10,20,45,0.92)] border border-yellow-500/20 rounded-2xl p-4 backdrop-blur-xl">
                  <h2 className="font-semibold text-[#f5ecd7] text-base mb-2">{room.roomName}</h2>
                  <div className="flex flex-wrap gap-3 text-xs text-white/50 mb-4">
                    <span>{room.floor}</span>
                    <span>{room.capacity} People</span>
                    <span className="text-[#d8c08c] font-semibold">${room.hourlyRate}/hr</span>
                  </div>
                  <div className="flex gap-2">
                    <UpdateModal room={room} />
                    <DeleteAlert room={room} />
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {!loading && rooms.length > 0 && (
          <p className="text-xs text-white/30 mt-4 text-right">
            total {rooms.length} room{rooms.length !== 1 ? "s" : ""}
          </p>
        )}

      </div>
    </div>
  );
};

export default AdminRoomsPage;