import { DeleteAlert } from "@/components/DeleteAlert";
import { UpdateModal } from "@/components/UpdateModal";
import { Card } from "@heroui/react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FaEdit, FaTrash } from "react-icons/fa";

const RoomDetailsPage = async ({ params }) => {
  const { id } =await params;

  const res = await fetch(`http://localhost:5000/room/${id}`, {
    cache: "no-store",
  });

  const room = await res.json();
  const { image, roomName, description, floor, capacity, hourlyRate, amenities } = room;

  return (
    <div>
      <Card className="overflow-hidden rounded-3xl border border-[#eadfca] bg-white shadow-xl">
        <div className="grid grid-cols-1 lg:grid-cols-2">
         
          <div className="relative h-[320px] lg:h-full min-h-[420px] overflow-hidden">
            <Image
                     src={image}
                     alt={roomName}
                     fill
                     className="object-cover"
                   />

            <div className="absolute inset-0 bg-[#0f172a]/25"></div>

            <div className="absolute top-5 right-5 rounded-full bg-[#0f172a]/90 px-5 py-2 text-sm font-semibold text-[#f5ecd7] backdrop-blur-md">
              ${hourlyRate}/hr
            </div>
          </div>

      
          <div className="p-6 md:p-10">
            <p className="mb-3 inline-block rounded-full bg-[#d8a84f]/20 px-4 py-1 text-sm font-medium text-[#8a661f]">
              Premium Study Space
            </p>

            <h2 className="text-3xl md:text-4xl font-bold text-[#0f172a]">
              {roomName}
            </h2>

            <p className="mt-5 leading-7 text-gray-600">
              {description}
            </p>

          
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="rounded-2xl bg-[#f8f4ea] p-4 border border-[#eadfca]">
                <p className="text-sm text-gray-500">Floor</p>
                <h3 className="mt-1 font-bold text-[#0f172a]">
                  {floor}
                </h3>
              </div>

              <div className="rounded-2xl bg-[#f8f4ea] p-4 border border-[#eadfca]">
                <p className="text-sm text-gray-500">Capacity</p>
                <h3 className="mt-1 font-bold text-[#0f172a]">
                  {capacity} People
                </h3>
              </div>

              <div className="rounded-2xl bg-[#f8f4ea] p-4 border border-[#eadfca]">
                <p className="text-sm text-gray-500">Hourly Rate</p>
                <h3 className="mt-1 font-bold text-[#d8a84f]">
                  ${hourlyRate}
                </h3>
              </div>
            </div>

          
            <div className="mt-8">
              <h3 className="text-xl font-bold text-[#0f172a]">
                Amenities
              </h3>

              <div className="mt-4 flex flex-wrap gap-3">
                {amenities?.map((amenity) => (
                  <span
                    key={amenity}
                    className="rounded-full border border-[#d8a84f]/40 bg-[#d8a84f]/15 px-4 py-2 text-sm font-medium text-[#0f172a]"
                  >
                    {amenity}
                  </span>
                ))}
              </div>
            </div>

          
            <div className="mt-10 flex flex-wrap gap-4">
              <Link
                href={`/book-room/${id}`}
                className="rounded-xl bg-[#0f172a] px-7 py-3 font-semibold text-[#f5ecd7] shadow-md transition duration-300 hover:bg-[#d8a84f] hover:text-[#0f172a]"
              >
                Book This Room
              </Link>

              <Link
                href="/rooms"
                className="rounded-xl border border-[#0f172a]/20 px-7 py-3 font-semibold text-[#0f172a] transition duration-300 hover:border-[#d8a84f] hover:bg-[#d8a84f]/20"
              >
                Back to Rooms
              </Link>
            </div>
            <div className="mt-6 flex flex-wrap items-center gap-4">

  <div className="flex w-[170px] gap-8">
    <UpdateModal room={room} />
    <DeleteAlert room={room} />
  </div>

 

</div>

          </div>
        </div>
       
      </Card>
    </div>
    
  );
};

export default RoomDetailsPage;