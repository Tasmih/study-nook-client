import { Card } from "@heroui/react";
import Image from "next/image";
import Link from "next/link";

const RoomsPage = async () => {
  const res = await fetch("http://localhost:5000/room", {
    cache: "no-store",
  });

  const rooms = await res.json();

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold text-[#0f172a]">
          All Rooms
        </h1>

        <p className="mt-2 text-gray-500">
          Browse all available study rooms
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {rooms?.map((room) => (
          <Card
            key={room._id}
            className="overflow-hidden rounded-3xl border border-[#eadfca]"
          >
            <div className="relative h-[220px]">
              <Image
                src={room.image}
                alt={room.roomName}
                fill
                className="object-cover"
              />
            </div>

            <div className="p-5">
              <h2 className="text-xl font-bold">
                {room.roomName}
              </h2>

              <p className="mt-2 line-clamp-2 text-gray-600">
                {room.description}
              </p>

              <div className="mt-4 flex justify-between text-sm">
                <span>Floor: {room.floor}</span>
                <span>{room.capacity} People</span>
              </div>

              <div className="mt-4">
                <p className="font-semibold text-[#d8a84f]">
                  ${room.hourlyRate}/hr
                </p>
              </div>

              <Link
                href={`/rooms/${room._id}`}
                className="mt-5 block rounded-xl bg-[#0f172a] py-3 text-center font-semibold text-[#f5ecd7]"
              >
                View Details
              </Link>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default RoomsPage;