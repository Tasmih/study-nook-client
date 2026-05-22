import { DeleteAlert } from "@/components/DeleteAlert";
import { UpdateModal } from "@/components/UpdateModal";
import { Card } from "@heroui/react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import RoomBookingAction from "@/components/RoomBookingActions";
import { FaArrowAltCircleLeft } from "react-icons/fa";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";

const RoomDetailsPage = async ({ params }) => {
  const { id } = await params;
  const { token } = await auth.api.getToken({
    headers: await headers(),
  });

  if (!id || id.length !== 24) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#070b18] via-[#0f172a] to-black flex items-center justify-center">
        <p className="text-red-400">Invalid room ID: {id}</p>
      </div>
    );
  }

  const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/room/${id}`, {
    cache: "no-store",
    headers: {
      authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#070b18] via-[#0f172a] to-black flex items-center justify-center">
        <p className="text-red-400">Room not found</p>
      </div>
    );
  }

  const room = await res.json();
  const { image, roomName, description, floor, capacity, hourlyRate, amenities } = room;

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#070b18] via-[#0f172a] to-black py-10">
      <div className="container mx-auto px-4">
        <Card className="overflow-hidden rounded-3xl border border-yellow-500/20 bg-[rgba(10,20,45,0.92)] backdrop-blur-xl shadow-[0_10px_48px_rgba(0,0,0,0.6)]">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            <div className="relative h-[320px] sm:h-[420px] lg:h-full min-h-[550px] overflow-hidden">
              <Image
                src={image || "/placeholder.jpg"}
                alt={roomName || "Room"}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-[#0f172a]/30" />
              <div className="absolute top-5 right-5 rounded-full bg-[#0f172a]/90 px-5 py-2 text-sm font-semibold text-[#d8c08c] border border-yellow-500/30">
                ${hourlyRate}/hr
              </div>
            </div>

            <div className="flex flex-col p-6 md:p-10">
              <p className="mb-3 w-fit rounded-full border border-[#d8c08c]/30 bg-[#d8c08c]/10 px-4 py-1 text-sm font-medium text-[#d8c08c]">
                Premium Study Space
              </p>

              <h2 className="text-3xl md:text-4xl font-semibold text-[#f5ecd7]">
                {roomName}
              </h2>

              <p className="mt-5 leading-7 text-white/60">{description}</p>

              <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
                <div className="rounded-2xl border border-yellow-500/20 bg-white/5 p-4">
                  <p className="text-sm text-white/40">Floor</p>
                  <h3 className="mt-1 font-bold text-[#f5ecd7]">{floor}</h3>
                </div>
                <div className="rounded-2xl border border-yellow-500/20 bg-white/5 p-4">
                  <p className="text-sm text-white/40">Capacity</p>
                  <h3 className="mt-1 font-bold text-[#f5ecd7]">{capacity} People</h3>
                </div>
                <div className="rounded-2xl border border-yellow-500/20 bg-white/5 p-4">
                  <p className="text-sm text-white/40">Hourly Rate</p>
                  <h3 className="mt-1 font-bold text-[#d8c08c]">${hourlyRate}</h3>
                </div>
              </div>

              <div className="mt-8">
                <h3 className="text-xl font-semibold text-[#f5ecd7]">Amenities</h3>
                <div className="mt-4 flex flex-wrap gap-3">
                  {amenities?.map((amenity) => (
                    <span
                      key={amenity}
                      className="rounded-full border border-yellow-500/20 bg-white/5 px-4 py-2 text-sm font-medium text-[#d8c08c]"
                    >
                      {amenity}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-10 rounded-3xl border border-yellow-500/20 bg-white/5 p-6">
                <h3 className="text-xl font-semibold text-[#f5ecd7]">
                  Interested in this study room?
                </h3>
                <p className="mt-2 text-sm leading-6 text-white/50">
                  Reserve your ideal study space and enjoy a peaceful,
                  comfortable and productive environment designed for better
                  focus and learning.
                </p>
                <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                  <RoomBookingAction room={room} roomId={id} />
                </div>
              </div>

              <div className="mt-6">
                <Link
                  href="/rooms"
                  className="inline-flex items-center gap-2 rounded-xl border border-[#d8c08c]/60 px-6 py-3 text-sm font-semibold text-[#f5ecd7] transition duration-300 hover:bg-white/5 hover:scale-[1.02]"
                >
                  <FaArrowAltCircleLeft />
                  Back To All Rooms
                </Link>
              </div>

              <div className="mt-8 flex flex-wrap gap-4">
                <UpdateModal room={room} />
                <DeleteAlert room={room} />
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default RoomDetailsPage;