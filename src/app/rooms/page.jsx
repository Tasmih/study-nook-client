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
  <div className="bg-[#fefce8] border border-[#e9e4b0] rounded-xl p-3 w-full">
    <p className="text-[10px] font-bold text-[#1a2744] uppercase tracking-widest mb-3">
      filters
    </p>

    <div className="mb-2.5">
      <label className="block text-[9px] font-semibold text-[#1a2744] uppercase tracking-wider mb-1">
        room name
      </label>
      <input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleSearch()}
        placeholder="search rooms..."
        className="w-full border border-[#d4cf90] bg-white px-2.5 py-1 rounded-lg text-[11px] focus:outline-none focus:ring-1 focus:ring-[#1a2744] placeholder:text-gray-300"
      />
    </div>

    <div className="mb-2.5">
      <label className="block text-[9px] font-semibold text-[#1a2744] uppercase tracking-wider mb-1">
        price ($/hr)
      </label>
      <div className="flex gap-1.5">
        <input
          value={min}
          onChange={(e) => setMin(e.target.value)}
          type="number" min={0} placeholder="min"
          className="w-full border border-[#d4cf90] bg-white px-2 py-1 rounded-lg text-[11px] focus:outline-none focus:ring-1 focus:ring-[#1a2744] placeholder:text-gray-300"
        />
        <input
          value={max}
          onChange={(e) => setMax(e.target.value)}
          type="number" min={0} placeholder="max"
          className="w-full border border-[#d4cf90] bg-white px-2 py-1 rounded-lg text-[11px] focus:outline-none focus:ring-1 focus:ring-[#1a2744] placeholder:text-gray-300"
        />
      </div>
    </div>

    <div className="mb-3">
      <label className="block text-[9px] font-semibold text-[#1a2744] uppercase tracking-wider mb-1.5">
        amenities
      </label>
      <div className="flex flex-col gap-1">
        {AMENITY_OPTIONS.map((amenity) => (
          <label key={amenity} className="flex items-center gap-1.5 cursor-pointer text-[11px] text-gray-600 hover:text-[#1a2744] transition">
            <input
              type="checkbox"
              checked={selectedAmenities.includes(amenity)}
              onChange={() => handleAmenityChange(amenity)}
              className="accent-[#1a2744] w-3 h-3 cursor-pointer"
            />
            {amenity}
          </label>
        ))}
      </div>
    </div>

    <div className="flex flex-col gap-1.5">
      <button onClick={handleSearch} className="w-full bg-[#1a2744] text-white py-1.5 rounded-lg text-[11px] font-semibold hover:bg-[#243460] active:scale-95 transition-all duration-150">
        apply filters
      </button>
      <button onClick={handleReset} className="w-full bg-white border border-[#d4cf90] text-[#1a2744] py-1.5 rounded-lg text-[11px] font-semibold hover:bg-[#fdf9d0] active:scale-95 transition-all duration-150">
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

  const fetchRooms = async (overrides = {}) => {
    setLoading(true);
    const activeSearch = overrides.search ?? search;
    const activeAmenities = overrides.amenities ?? selectedAmenities;
    const activeMin = overrides.min ?? min;
    const activeMax = overrides.max ?? max;
    const query = new URLSearchParams();
    if (activeSearch) query.append("search", activeSearch);
    if (activeAmenities.length > 0) query.append("amenities", activeAmenities.join(","));
    if (activeMin) query.append("min", activeMin);
    if (activeMax) query.append("max", activeMax);
    try {
      const res = await fetch(`http://localhost:5000/room?${query.toString()}`, { cache: "no-store" });
      const data = await res.json();
      setRooms(data);
    } catch {
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
    <div className="max-w-7xl mx-auto px-4 pt-2 pb-10">

      <div className="text-center mb-3">
        <h1 className="text-3xl font-bold text-[#0f172a]">All Study Rooms</h1>
        <p className="text-gray-400 mt-0.5 text-xs">find and book your perfect study space</p>
      </div>

      <div className="flex items-center justify-between mb-2 lg:hidden">
        <p className="text-xs text-gray-400">
          {!loading && `${rooms.length} room${rooms.length !== 1 ? "s" : ""} found`}
        </p>
        <button
          onClick={() => setMobileFilterOpen((prev) => !prev)}
          className="flex items-center gap-1.5 bg-[#1a2744] text-white text-xs font-semibold px-3 py-1.5 rounded-lg hover:bg-[#5c7bce] transition"
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
            <p className="text-xs text-gray-800 mb-3">
              {rooms.length} room{rooms.length !== 1 ? "s" : ""} found
            </p>
          )}

          {loading && (
            <div className="flex flex-col items-center justify-center py-20 text-gray-400 gap-2">
              <LuLoader className="text-3xl animate-spin" />
              <p className="text-xs">loading rooms...</p>
            </div>
          )}

          {!loading && rooms.length === 0 && (
            <div className="text-center py-20">
              <LuSearchX className="text-5xl text-gray-200 mx-auto mb-3" />
              <h2 className="text-lg font-semibold text-gray-600">no rooms found</h2>
              <p className="text-gray-400 mt-1 text-xs">try adjusting your filters</p>
              <button
                onClick={handleReset}
                className="mt-4 px-5 py-1.5 bg-[#1a2744] text-white rounded-xl text-xs hover:bg-[#3d5596] transition"
              >
                clear filters
              </button>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
            {rooms.map((room) => (
              <Card
                key={room._id}
                className="rounded-2xl overflow-hidden border border-gray-200 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200"
              >
                <div className="relative h-[160px] w-full">
                  <Image src={room.image} alt={room.roomName} fill className="object-cover" />
                </div>

                <div className="p-3.5">
                  <h2 className="text-sm font-bold text-[#1a2744] leading-tight">{room.roomName}</h2>
                  <p className="text-gray-800 text-[11px] mt-1 line-clamp-2 leading-relaxed">{room.description}</p>

                  <div className="flex justify-between mt-2.5 text-[11px] text-gray-600">
                    <span className="flex items-center gap-0.5">
                      <MdLocationOn className="text-sm text-[#1a2744]" />
                      {room.floor}
                    </span>
                    <span className="flex items-center gap-0.5">
                      <MdPeople className="text-sm text-[#1a2744]" />
                      {room.capacity} people
                    </span>
                  </div>

                  {room.amenities?.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-2">
                      {room.amenities.slice(0, 3).map((a) => (
                        <span key={a} className="text-[9px] bg-[#fefce8] border border-[#c7b920] text-[#1a2744] px-1.5 py-0.5 rounded-full">
                          {a}
                        </span>
                      ))}
                      {room.amenities.length > 3 && (
                        <span className="text-[9px] text-gray-500">+{room.amenities.length - 3} more</span>
                      )}
                    </div>
                  )}

                  <p className="mt-2 font-bold text-yellow-500 text-sm">${room.hourlyRate}/hr</p>

                  <Link
                    href={`/rooms/${room._id}`}
                    className="block text-center mt-3 bg-[#192e5b] text-white py-1.5 rounded-xl text-[11px] font-semibold hover:bg-[#233a76] active:scale-95 transition-all duration-150"
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
  );
};

export default RoomsPage;