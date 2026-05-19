"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import RoomCard from "@/components/RoomCard";

const Featured = () => {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRooms = async () => {
      const res = await fetch("http://localhost:5000/featured");
      const data = await res.json();
      setRooms(data);
      setLoading(false);
    };

    fetchRooms();
  }, []);

  return (
    <section className="max-w-7xl mx-auto px-4 py-16">


      <div className="flex items-center justify-between mb-10">
        <div>
          <h2 className="text-3xl font-bold text-[#0f172a]">
            Available Study Rooms
          </h2>
          <p className="text-gray-500 mt-1">
            Browse our latest study spaces
          </p>
        </div>
        <Link
          href="/rooms"
          className="rounded-xl bg-[#0f172a] px-5 py-3 text-sm font-medium text-[#f5ecd7] transition duration-300 hover:bg-[#d8a84f] hover:text-[#0f172a]"
        >
          View All Rooms →
        </Link>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="h-80 bg-[#f8f4ea] rounded-2xl animate-pulse" />
          ))}
        </div>

      ) : rooms.length === 0 ? (
        <p className="text-center text-gray-500 py-10">No rooms available.</p>

      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {rooms.map((room) => (
            <RoomCard key={room._id} room={room} />
          ))}
        </div>
      )}

    </section>
  );
};

export default Featured;