"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { authClient } from "@/lib/auth-client";
import { Avatar, AvatarFallback, AvatarImage, Button } from "@heroui/react";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const profileRef = useRef(null);

  const { data: session } = authClient.useSession();
  const user = session?.user;

  const handleSignOut = async () => {
    await authClient.signOut();
    setProfileOpen(false);
    setOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setProfileOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="w-full sticky top-0 z-50 bg-gradient-to-r from-yellow-300 via-gray-700 to-gray-900 text-white px-6 py-4 shadow-xl border-b border-white/10 backdrop-blur-md">

      <div className="flex items-center justify-between">

     
        <Link href="/" className="flex items-center">
          <Image
            src="/logo_light.png"
            width={200}
            height={180}
            alt="StudyNook"
            className="object-contain"
          />
        </Link>

     
        <div className="hidden md:flex gap-7 items-center text-gray-300 font-medium">

          <Link href="/" className="hover:text-white">Home</Link>
          <Link href="/rooms" className="hover:text-white">Rooms</Link>

          {user && (
            <>
              <Link href="/add-room" className="hover:text-white">
                Add Room
              </Link>

              <Link href="/my-listings" className="hover:text-white">
                My Listings
              </Link>

              <Link href="/my-bookings" className="hover:text-white">
                My Bookings
              </Link>
            </>
          )}
        </div>

      
        <div className="hidden md:flex items-center gap-4 relative" ref={profileRef}>

          {user ? (
            <>
            
              <button onClick={() => setProfileOpen(!profileOpen)}>
                <Avatar>
                  <AvatarImage referrerPolicy="no-referrer" src={user?.image} />
                  <AvatarFallback>
                    {user?.name?.charAt(0)}
                  </AvatarFallback>
                </Avatar>
              </button>

             
              {profileOpen && (
                <div className="absolute right-0 top-12 w-52 bg-gray-900 border border-white/10 rounded-lg shadow-lg p-2">

                  <p className="px-3 py-2 text-sm text-gray-400">
                    {user?.name}
                  </p>

                  <hr className="border-white/10 my-1" />

                  <Link
                    href="/my-listings"
                    className="block px-3 py-2 hover:bg-white/10 rounded"
                    onClick={() => setProfileOpen(false)}
                  >
                    My Listings
                  </Link>

                  <Link
                    href="/my-bookings"
                    className="block px-3 py-2 hover:bg-white/10 rounded"
                    onClick={() => setProfileOpen(false)}
                  >
                    My Bookings
                  </Link>

                  <button
                    onClick={handleSignOut}
                    className="w-full text-left px-3 py-2 text-red-400 hover:bg-white/10 rounded"
                  >
                    Logout
                  </button>
                </div>
              )}

              <Button
                color="danger"
                className="ml-2"
                onClick={handleSignOut}
              >
                Logout
              </Button>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="px-4 py-1 rounded-md border border-white/20 hover:bg-white/10"
              >
                Login
              </Link>

              <Link
                href="/register"
                className="px-4 py-1 rounded-md bg-blue-600 hover:bg-blue-700"
              >
                Register
              </Link>
            </>
          )}
        </div>

      
        <button
          className="md:hidden text-2xl"
          onClick={() => setOpen(!open)}
        >
          ☰
        </button>
      </div>

      {open && (
        <div className="md:hidden mt-4 flex flex-col gap-3 bg-gray-900/90 border border-white/10 p-4 rounded-xl">

          <Link href="/" onClick={() => setOpen(false)}>
            Home
          </Link>

          <Link href="/rooms" onClick={() => setOpen(false)}>
            Rooms
          </Link>

          {user && (
            <>
              <Link href="/add-room" onClick={() => setOpen(false)}>
                Add Room
              </Link>

              <Link href="/my-listings" onClick={() => setOpen(false)}>
                My Listings
              </Link>

              <Link href="/my-bookings" onClick={() => setOpen(false)}>
                My Bookings
              </Link>
            </>
          )}

          <hr className="border-white/10" />

          {user ? (
            <Button color="danger" onClick={handleSignOut}>
              Logout
            </Button>
          ) : (
            <>
              <Link href="/login" onClick={() => setOpen(false)}>
                Login
              </Link>

              <Link href="/register" onClick={() => setOpen(false)}>
                Register
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
}