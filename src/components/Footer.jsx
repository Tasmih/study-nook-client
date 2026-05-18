"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

export default function Footer() {
  const [open, setOpen] = useState(null);

  const toggle = (name) => {
    setOpen(open === name ? null : name);
  };

  return (
    <motion.footer
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="relative mt-20 bg-[#0B1B3A] text-gray-300 overflow-hidden"
    >

      {/* Background glow */}
      <div className="absolute -top-20 -left-20 w-72 h-72 bg-blue-500/10 blur-3xl rounded-full" />
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-indigo-500/10 blur-3xl rounded-full" />

      <div className="max-w-7xl mx-auto px-6 md:px-16 py-16">

        {/* Brand */}
        <div className="mb-12">
          <h1 className="text-4xl md:text-6xl font-bold text-white">
            StudyNook
          </h1>
          <p className="mt-3 max-w-xl text-gray-400">
            Find study spaces, manage bookings, and stay productive anywhere.
          </p>
        </div>

        {/* GRID */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">

          {/* Explore */}
          <div>
            <button
              onClick={() => toggle("explore")}
              className="md:cursor-default w-full flex justify-between items-center text-white font-semibold"
            >
              Explore
              <span className="md:hidden">{open === "explore" ? "-" : "+"}</span>
            </button>

            <div className={`mt-3 space-y-2 text-sm overflow-hidden transition-all duration-300 ${
              open === "explore" ? "max-h-40" : "max-h-0 md:max-h-full"
            }`}>
              <Link href="/" className="block hover:text-white">Home</Link>
              <Link href="/rooms" className="block hover:text-white">Rooms</Link>
              <Link href="/destinations" className="block hover:text-white">Spaces</Link>
            </div>
          </div>

          {/* Account */}
          <div>
            <button
              onClick={() => toggle("account")}
              className="md:cursor-default w-full flex justify-between items-center text-white font-semibold"
            >
              Account
              <span className="md:hidden">{open === "account" ? "-" : "+"}</span>
            </button>

            <div className={`mt-3 space-y-2 text-sm overflow-hidden transition-all duration-300 ${
              open === "account" ? "max-h-40" : "max-h-0 md:max-h-full"
            }`}>
              <Link href="/my-bookings" className="block hover:text-white">My Bookings</Link>
              <Link href="/profile" className="block hover:text-white">Profile</Link>
              <Link href="/add-room" className="block hover:text-white">Add Room</Link>
            </div>
          </div>

          {/* Support */}
          <div>
            <button
              onClick={() => toggle("support")}
              className="md:cursor-default w-full flex justify-between items-center text-white font-semibold"
            >
              Support
              <span className="md:hidden">{open === "support" ? "-" : "+"}</span>
            </button>

            <div className={`mt-3 space-y-2 text-sm overflow-hidden transition-all duration-300 ${
              open === "support" ? "max-h-40" : "max-h-0 md:max-h-full"
            }`}>
              <Link href="/help" className="block hover:text-white">Help Center</Link>
              <Link href="/terms" className="block hover:text-white">Terms</Link>
              <Link href="/privacy" className="block hover:text-white">Privacy</Link>
            </div>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-white font-semibold mb-3">Stay Updated</h3>

            <div className="flex items-center bg-white/5 border border-white/10 px-3 py-2 rounded-md">
              <input
                type="email"
                placeholder="Email"
                className="bg-transparent outline-none flex-1 text-sm"
              />
              <span className="text-white cursor-pointer">↗</span>
            </div>
          </div>

        </div>

        {/* Bottom */}
        <div className="border-t border-white/10 mt-14 pt-6 flex flex-col md:flex-row justify-between items-center">

          <p className="text-sm text-gray-400">
            © {new Date().getFullYear()} StudyNook. All rights reserved.
          </p>

          {/* Social */}
          <div className="flex gap-6 mt-4 md:mt-0 text-xl">

            <motion.a whileHover={{ y: -5, scale: 1.2 }} href="#" className="hover:text-white">
              <FaFacebook />
            </motion.a>

            <motion.a whileHover={{ y: -5, scale: 1.2 }} href="#" className="hover:text-white">
              <FaXTwitter />
            </motion.a>

            <motion.a whileHover={{ y: -5, scale: 1.2 }} href="#" className="hover:text-white">
              <FaLinkedin />
            </motion.a>

            <motion.a whileHover={{ y: -5, scale: 1.2 }} href="#" className="hover:text-white">
              <FaInstagram />
            </motion.a>

          </div>

        </div>
      </div>
    </motion.footer>
  );
}