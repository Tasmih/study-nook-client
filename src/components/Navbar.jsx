'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="w-full sticky top-0 z-50 bg-gradient-to-r from-yellow-300 via-gray-700 to-gray-900 text-white px-6 py-4 shadow-xl border-b border-white/10 backdrop-blur-md">
      
      <div className="flex items-center justify-between">
        
        <Link href="/" className="flex items-center">
          <Image
            src="/logo_light.png"
            width={200}
            height={180}
            alt="logo"
            className="object-contain drop-shadow-md"
          />
        </Link>

        <div className="hidden md:flex gap-7 items-center text-gray-300 font-medium">
          <Link className="hover:text-white transition-colors duration-200 relative after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0 after:bg-blue-500 hover:after:w-full after:transition-all" href="/">Home</Link>
          <Link className="hover:text-white transition-colors duration-200 relative after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0 after:bg-blue-500 hover:after:w-full after:transition-all" href="/rooms">Rooms</Link>
          <Link className="hover:text-white transition-colors duration-200 relative after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0 after:bg-blue-500 hover:after:w-full after:transition-all" href="/add-room">Add Room</Link>
          <Link className="hover:text-white transition-colors duration-200 relative after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0 after:bg-blue-500 hover:after:w-full after:transition-all" href="/my-listings">My Listings</Link>
          <Link className="hover:text-white transition-colors duration-200 relative after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0 after:bg-blue-500 hover:after:w-full after:transition-all" href="/my-bookings">My Bookings</Link>
        </div>

        <div className="hidden md:flex gap-3 items-center">
          <Link className="px-4 py-1 rounded-md border border-white/20 hover:bg-white/10 transition" href="/login">Login</Link>
          <Link className="px-4 py-1 rounded-md bg-blue-600 hover:bg-blue-700 transition shadow-md" href="/register">Register</Link>
        </div>

        <button
          className="md:hidden text-2xl text-white hover:text-blue-400 transition"
          onClick={() => setOpen(!open)}
        >
          ☰
        </button>
      </div>

      {open && (
        <div className="md:hidden mt-4 flex flex-col gap-3 bg-gray-900/90 border border-white/10 p-4 rounded-xl shadow-lg backdrop-blur-md">
          <Link href="/" onClick={() => setOpen(false)} className="hover:text-blue-400">Home</Link>
          <Link href="/rooms" onClick={() => setOpen(false)} className="hover:text-blue-400">Rooms</Link>
          <Link href="/add-room" onClick={() => setOpen(false)} className="hover:text-blue-400">Add Room</Link>
          <Link href="/my-listings" onClick={() => setOpen(false)} className="hover:text-blue-400">My Listings</Link>
          <Link href="/my-bookings" onClick={() => setOpen(false)} className="hover:text-blue-400">My Bookings</Link>

          <hr className="border-white/10" />

          <Link href="/login" onClick={() => setOpen(false)} className="hover:text-blue-400">Login</Link>
          <Link href="/register" onClick={() => setOpen(false)} className="text-blue-400">Register</Link>
        </div>
      )}
    </nav>
  );
}