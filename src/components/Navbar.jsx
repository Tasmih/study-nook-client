"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { FiLogOut, FiUser } from "react-icons/fi";
import { FaCheckCircle } from "react-icons/fa";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const profileRef = useRef(null);
  const router = useRouter();

  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;

  const publicMenuItems = [
    { name: "Home", path: "/" },
    { name: "Rooms", path: "/rooms" },
  ];

  const privateMenuItems = [
    { name: "Home", path: "/" },
    { name: "Rooms", path: "/rooms" },
    { name: "Add Room", path: "/add-room" },
    { name: "My Listings", path: "/my-listings" },
    { name: "My Bookings", path: "/my-bookings" },
    { name: "Admin", path: "/admin/rooms" },
  ];

  const menuItems = user ? privateMenuItems : publicMenuItems;

  const handleSignOut = async () => {
    await authClient.signOut();
    setProfileOpen(false);
    setOpen(false);
    toast.success("Logged out successfully", {
      icon: <FaCheckCircle />,
    });
    router.push("/login");
    router.refresh();
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
          <div className="relative w-[120px] h-[60px]">
            <Image src="/logo_light.png" alt="StudyNook" fill sizes="120px" className="object-contain" />
          </div>
        </Link>

        <div className="hidden md:flex gap-7 items-center text-gray-300 font-medium">
          {menuItems.map((item) => (
            <Link key={item.name} href={item.path} className="hover:text-white">
              {item.name}
            </Link>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-4 relative" ref={profileRef}>
          {isPending ? (
            <span className="text-sm text-white/70">Loading...</span>
          ) : user ? (
            <>
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1 text-sm text-white">
                  <FiUser className="text-yellow-300" />
                  <span>Hello, <span className="font-semibold text-yellow-300">{user?.name?.split(" ")[0]}</span></span>
                </div>
                <button onClick={() => setProfileOpen(!profileOpen)}>
                  <img
                    src={user.image || "https://i.ibb.co.com/5xWzYz9/user-placeholder.png"}
                    alt={user.name || "User"}
                    className="h-9 w-9 rounded-full border-2 border-yellow-300 object-cover"
                  />
                </button>
              </div>

              <div className={`absolute right-0 top-12 w-56 bg-gray-900 border border-white/10 rounded-lg shadow-lg p-2 z-50 transform transition-all duration-200 origin-top ${profileOpen ? "scale-100 opacity-100" : "scale-95 opacity-0 pointer-events-none"}`}>
                <p className="px-3 py-2 text-sm text-gray-400">{user?.name}</p>
                <hr className="border-white/10 my-1" />
                <Link href="/my-listings" className="block px-3 py-2 hover:bg-white/10 rounded" onClick={() => setProfileOpen(false)}>My Listings</Link>
                <Link href="/my-bookings" className="block px-3 py-2 hover:bg-white/10 rounded" onClick={() => setProfileOpen(false)}>My Bookings</Link>
                <Link href="/add-room" className="block px-3 py-2 hover:bg-white/10 rounded" onClick={() => setProfileOpen(false)}>Add Room</Link>
                <Link href="/admin/rooms" className="block px-3 py-2 hover:bg-white/10 rounded" onClick={() => setProfileOpen(false)}>Admin</Link>
                <button onClick={handleSignOut} className="w-full flex items-center gap-2 px-3 py-2 mt-2 text-red-400 hover:bg-white/10 rounded">
                  <FiLogOut />
                  Sign Out
                </button>
              </div>
            </>
          ) : (
            <>
              <Link href="/login" className="px-4 py-1 rounded-md border border-white/20 hover:bg-white/10">Login</Link>
              <Link href="/register" className="px-4 py-1 rounded-md bg-blue-600 hover:bg-blue-700">Register</Link>
            </>
          )}
        </div>

        <button className="md:hidden text-2xl" onClick={() => setOpen(!open)}>☰</button>
      </div>

      <div className={`md:hidden mt-4 flex flex-col gap-3 bg-gray-900/90 border border-white/10 p-4 rounded-xl transition-all duration-200 ${open ? "block" : "hidden"}`}>
        {menuItems.map((item) => (
          <Link key={item.name} href={item.path} onClick={() => setOpen(false)}>{item.name}</Link>
        ))}
        <hr className="border-white/10" />
        {isPending ? (
          <span className="text-sm text-white/70">Loading...</span>
        ) : user ? (
          <>
            <div className="flex items-center gap-2">
              <FiUser className="text-yellow-300" />
              <span>Hello, {user?.name?.split(" ")[0]}</span>
            </div>
            <button onClick={handleSignOut} className="flex items-center gap-2 text-red-400">
              <FiLogOut />
              Sign Out
            </button>
          </>
        ) : (
          <>
            <Link href="/login" onClick={() => setOpen(false)}>Login</Link>
            <Link href="/register" onClick={() => setOpen(false)}>Register</Link>
          </>
        )}
      </div>
    </nav>
  );
}