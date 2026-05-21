import { DeleteAlert } from "@/components/DeleteAlert";
import { UpdateModal } from "@/components/UpdateModal";
import { Card } from "@heroui/react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import RoomBookingAction from "@/components/RoomBookingActions";
import { FaArrowAltCircleLeft } from "react-icons/fa";
import { header } from "framer-motion/client";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";



const RoomDetailsPage = async ({ params }) => {
  const { id } = await params;
  const {token} = await auth.api.getToken({
    headers:await headers()
  })
  console.log(token)

  if (!id || id.length !== 24) {
    return (
      <div className="p-10 text-red-500">
        Invalid room ID: {id}
      </div>
    );
  }

  const res = await fetch(`http://localhost:5000/room/${id}`, {
    cache: "no-store",
    headers:{
      authorization: `Bearer ${token}`
    }
    
  });

  if (!res.ok) {
    return (
      <div className="p-10 text-red-500">
        Room not found
      </div>
    );
  }

  const room = await res.json();

  const {
    image,
    roomName,
    description,
    floor,
    capacity,
    hourlyRate,
    amenities,
  } = room;

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="overflow-hidden rounded-3xl border border-[#eadfca] bg-white shadow-xl">
        <div className="grid grid-cols-1 lg:grid-cols-2">

          <div className="relative h-[320px] sm:h-[420px] lg:h-full min-h-[550px] overflow-hidden">
            <Image
              src={image || "/placeholder.jpg"}
              alt={roomName || "Room"}
              fill
              className="object-cover"
            />

            <div className="absolute inset-0 bg-[#0f172a]/25" />

            <div className="absolute top-5 right-5 rounded-full bg-[#0f172a]/90 px-5 py-2 text-sm font-semibold text-[#f5ecd7]">
              ${hourlyRate}/hr
            </div>
          </div>

          <div className="flex flex-col p-6 md:p-10">

            <p className="mb-3 w-fit rounded-full bg-[#d8a84f]/20 px-4 py-1 text-sm font-medium text-[#8a661f]">
              Premium Study Space
            </p>

            <h2 className="text-3xl md:text-4xl font-bold text-[#0f172a]">
              {roomName}
            </h2>

            <p className="mt-5 leading-7 text-gray-600">
              {description}
            </p>

            <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">

              <div className="rounded-2xl border border-[#eadfca] bg-[#f8f4ea] p-4">
                <p className="text-sm text-gray-500">
                  Floor
                </p>

                <h3 className="mt-1 font-bold text-[#0f172a]">
                  {floor}
                </h3>
              </div>

              <div className="rounded-2xl border border-[#eadfca] bg-[#f8f4ea] p-4">
                <p className="text-sm text-gray-500">
                  Capacity
                </p>

                <h3 className="mt-1 font-bold text-[#0f172a]">
                  {capacity} People
                </h3>
              </div>

              <div className="rounded-2xl border border-[#eadfca] bg-[#f8f4ea] p-4">
                <p className="text-sm text-gray-500">
                  Hourly Rate
                </p>

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

            <div className="mt-8 flex flex-wrap gap-4">
              <UpdateModal room={room} />
              <DeleteAlert room={room} />
            </div>

            <div className="mt-10 rounded-3xl border border-[#eadfca] bg-[#f8f4ea] p-6 shadow-sm">

              <h3 className="text-xl font-bold text-[#0f172a]">
                Interested in this study room?
              </h3>

              <p className="mt-2 text-sm leading-6 text-gray-600">
                Reserve your ideal study space and enjoy a peaceful,
                comfortable and productive environment designed for better
                focus and learning.
              </p>

              <div className="mt-6 flex flex-col gap-3 sm:flex-row">

                <RoomBookingAction
                  room={room}
                  roomId={id}
                />

             

              </div>

            </div>
   <div className="flex justify-items-start mt-4">
    <Link
                  href="/rooms"
                  className="rounded-xl border border-[#0f172a]/20 px-6 py-3 text-center bg-yellow-600 font-semibold text-[#0f172a] transition hover:border-[#d8a84f] hover:bg-[#d8a84f]/20"
                >
                 <div className="flex gap-2"> <div className="mt-1"><FaArrowAltCircleLeft/></div> Back To All Rooms
                   
                  </div>
                </Link>
   </div>
          </div>

        </div>
      </Card>
    </div>
  );
};

export default RoomDetailsPage;