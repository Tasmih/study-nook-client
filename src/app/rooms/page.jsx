"use client";

import { useEffect, useState } from "react";
import { Card } from "@heroui/react";
import Image from "next/image";
import Link from "next/link";
import { MdLocationOn, MdPeople } from "react-icons/md";
import { LuSearchX, LuLoader, LuSlidersHorizontal } from "react-icons/lu";

const AMENITY_OPTIONS = [
  "Wi-Fi", "Whiteboard", "Projector", "AC",
  "Power Outlets", "Standing Desk", "Locker", "Printing",
];

const FilterPanel = ({
  search, setSearch, min, setMin, max, setMax,
  selectedAmenities, handleAmenityChange, handleSearch, handleReset,
}) => (
  <div className="bg-[rgba(10,20,45,0.92)] border border-yellow-500/20 rounded-xl p-3 w-full backdrop-blur-xl">
    <p className="text-[10px] font-bold text-[#d8c08c] uppercase tracking-widest mb-3">
      filters
    </p>

    <div className="mb-2.5">
      <label className="block text-[9px] font-semibold text-[#f5ecd7]/70 uppercase tracking-wider mb-1">
        room name
      </label>
      <input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleSearch()}
        placeholder="search rooms..."
        className="w-full border border-yellow-500/20 bg-white/5 px-2.5 py-1 rounded-lg text-[11px] text-white focus:outline-none focus:ring-1 focus:ring-yellow-400/40 placeholder:text-white/30"
      />
    </div>

    <div className="mb-2.5">
      <label className="block text-[9px] font-semibold text-[#f5ecd7]/70 uppercase tracking-wider mb-1">
        price ($/hr)
      </label>
      <div className="flex gap-1.5">
        <input
          value={min}
          onChange={(e) => setMin(e.target.value)}
          type="number" min={0} placeholder="min"
          className="w-full border border-yellow-500/20 bg-white/5 px-2 py-1 rounded-lg text-[11px] text-white focus:outline-none focus:ring-1 focus:ring-yellow-400/40 placeholder:text-white/30"
        />
        <input
          value={max}
          onChange={(e) => setMax(e.target.value)}
          type="number" min={0} placeholder="max"
          className="w-full border border-yellow-500/20 bg-white/5 px-2 py-1 rounded-lg text-[11px] text-white focus:outline-none focus:ring-1 focus:ring-yellow-400/40 placeholder:text-white/30"
        />
      </div>
    </div>

    <div className="mb-3">
      <label className="block text-[9px] font-semibold text-[#f5ecd7]/70 uppercase tracking-wider mb-1.5">
        amenities
      </label>
      <div className="flex flex-col gap-1">
        {AMENITY_OPTIONS.map((amenity) => (
          <label key={amenity} className="flex items-center gap-1.5 cursor-pointer text-[11px] text-white/60 hover:text-[#d8c08c] transition">
            <input
              type="checkbox"
              checked={selectedAmenities.includes(amenity)}
              onChange={() => handleAmenityChange(amenity)}
              className="accent-[#d8c08c] w-3 h-3 cursor-pointer"
            />
            {amenity}
          </label>
        ))}
      </div>
    </div>

    <div className="flex flex-col gap-1.5">
     
      <button
        onClick={handleSearch}
        className="w-full bg-[#d8c08c] text-[#0f172a] py-1.5 rounded-lg text-[11px] font-semibold hover:bg-[#e7d2a3] hover:scale-[1.02] active:scale-95 transition-all duration-200"
      >
        apply filters
      </button>
      
      <button
        onClick={handleReset}
        className="w-full border border-[#d8c08c]/60 text-[#f5ecd7] py-1.5 rounded-lg text-[11px] font-semibold hover:bg-white/5 active:scale-95 transition-all duration-200"
      >
        reset
      </button>
    </div>
  </div>
);

const RoomsPage = () => {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [selectedAmenities, setSelectedAmenities] = useState([]);
  const [min, setMin] = useState("");
  const [max, setMax] = useState("");

  useEffect(() => {
    document.title = "StudyNook - Available Rooms";
  }, []);

 const fetchRooms = async (overrides = {}) => {
  setLoading(true);
  const activeSearch = overrides.search ?? search;
  const activeAmenities = overrides.amenities ?? selectedAmenities;
  const activeMin = overrides.min ?? min;
  const activeMax = overrides.max ?? max;
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/room?search=${activeSearch}&amenities=${activeAmenities.join(",")}&min=${activeMin ?? ""}&max=${activeMax ?? ""}`,
      { cache: "no-store" }
    );
    const data = await res.json();
    setRooms(data);
  } catch (err) {
    console.error("fetchRooms failed:", err);
    setRooms([]);
  } finally {
    setLoading(false);
  }
};
  useEffect(() => { fetchRooms(); }, []);

  const handleAmenityChange = (amenity) => {
    setSelectedAmenities((prev) =>
      prev.includes(amenity) ? prev.filter((a) => a !== amenity) : [...prev, amenity]
    );
  };

  const handleSearch = () => { fetchRooms(); setMobileFilterOpen(false); };

  const handleReset = () => {
    setSearch(""); setSelectedAmenities([]); setMin(""); setMax("");
    fetchRooms({ search: "", amenities: [], min: "", max: "" });
    setMobileFilterOpen(false);
  };

  const filterProps = {
    search, setSearch, min, setMin, max, setMax,
    selectedAmenities, handleAmenityChange, handleSearch, handleReset,
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#070b18] via-[#0f172a] to-black">
      <div className="max-w-7xl mx-auto px-4 pt-8 pb-10">

        {/* Heading — home page style */}
        <div className="text-center mb-6">
          <h1 className="text-4xl sm:text-5xl font-semibold text-[#f5ecd7]">
            All Study <span className="text-[#d8c08c] italic">Rooms</span>
          </h1>
          <p className="text-white/40 mt-2 text-sm">
            find and book your perfect study space
          </p>
        </div>

        {/* Mobile filter toggle */}
        <div className="flex items-center justify-between mb-2 lg:hidden">
          <p className="text-xs text-white/40">
            {!loading && `${rooms.length} room${rooms.length !== 1 ? "s" : ""} found`}
          </p>
          <button
            onClick={() => setMobileFilterOpen((prev) => !prev)}
            className="flex items-center gap-1.5 bg-[#d8c08c] text-[#0f172a] text-xs font-semibold px-3 py-1.5 rounded-lg hover:bg-[#e7d2a3] hover:scale-[1.02] transition-all duration-200"
          >
            <LuSlidersHorizontal className="text-sm" />
            {mobileFilterOpen ? "close" : "filters"}
          </button>
        </div>

        {mobileFilterOpen && (
          <div className="mb-4 lg:hidden">
            <FilterPanel {...filterProps} />
          </div>
        )}

        <div className="flex gap-5 items-start">

          <aside className="hidden lg:block w-44 shrink-0 sticky top-20 self-start">
            <FilterPanel {...filterProps} />
          </aside>

          <div className="flex-1 min-w-0">

            {!loading && rooms.length > 0 && (
              <p className="text-xs text-white/50 mb-3">
                {rooms.length} room{rooms.length !== 1 ? "s" : ""} found
              </p>
            )}

           
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
                <p className="text-white/40 mt-1 text-xs">try adjusting your filters</p>
                <button
                  onClick={handleReset}
                  className="mt-4 px-5 py-1.5 bg-[#d8c08c] text-[#0f172a] rounded-xl text-xs font-semibold hover:bg-[#e7d2a3] hover:scale-[1.02] transition-all duration-200"
                >
                  clear filters
                </button>
              </div>
            )}

            
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
              {rooms.map((room) => (
                <Card
                  key={room._id}
                  className="rounded-2xl overflow-hidden bg-[rgba(10,20,45,0.92)] border border-yellow-500/20 hover:shadow-[0_8px_30px_rgba(0,0,0,0.5)] hover:-translate-y-0.5 transition-all duration-200"
                >
                  <div className="relative h-[160px] w-full">
                    <Image src={room.image} alt={room.roomName} fill className="object-cover" />
                  </div>

                  <div className="p-3.5">
                    <h2 className="text-sm font-bold text-[#f5ecd7] leading-tight">{room.roomName}</h2>
                    <p className="text-white/50 text-[11px] mt-1 line-clamp-2 leading-relaxed">{room.description}</p>

                    <div className="flex justify-between mt-2.5 text-[11px] text-white/50">
                      <span className="flex items-center gap-0.5">
                        <MdLocationOn className="text-sm text-[#d8c08c]" />
                        {room.floor}
                      </span>
                      <span className="flex items-center gap-0.5">
                        <MdPeople className="text-sm text-[#d8c08c]" />
                        {room.capacity} people
                      </span>
                    </div>

                    {room.amenities?.length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-2">
                        {room.amenities.slice(0, 3).map((a) => (
                          <span key={a} className="text-[9px] bg-white/5 border border-yellow-500/20 text-[#d8c08c] px-1.5 py-0.5 rounded-full">
                            {a}
                          </span>
                        ))}
                        {room.amenities.length > 3 && (
                          <span className="text-[9px] text-white/30">+{room.amenities.length - 3} more</span>
                        )}
                      </div>
                    )}

                    <p className="mt-2 font-bold text-[#d8c08c] text-sm">${room.hourlyRate}/hr</p>

                    {/* Button — home page primary style */}
                    <Link
                      href={`/rooms/${room._id}`}
                      className="block text-center mt-3 bg-[#d8c08c] text-[#0f172a] py-1.5 rounded-xl text-[11px] font-semibold hover:bg-[#e7d2a3] hover:scale-[1.02] active:scale-95 transition-all duration-200"
                    >
                      view details
                    </Link>
                  </div>
                </Card>
              ))}
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomsPage;