"use client";

import Link from "next/link";
import { FaHome } from "react-icons/fa";
import { HiArrowLeft } from "react-icons/hi2";

const NotFoundPage = () => {
  return (
    <div className="relative min-h-screen flex items-center justify-center bg-[#0f172a] overflow-hidden px-6">

      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(216,192,140,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(216,192,140,0.04) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div className="absolute -top-24 -left-28 w-[500px] h-[500px] rounded-full pointer-events-none bg-[radial-gradient(circle,rgba(216,192,140,0.10)_0%,transparent_70%)]" />
      <div className="absolute -bottom-20 -right-16 w-[360px] h-[360px] rounded-full pointer-events-none bg-[radial-gradient(circle,rgba(219,228,238,0.07)_0%,transparent_70%)]" />

      <div className="relative z-10 text-center max-w-2xl w-full">

        <span className="inline-flex items-center gap-2 border border-[#d8c08c]/25 bg-[#d8c08c]/10 text-[#d8c08c] text-xs tracking-widest uppercase px-4 py-1.5 rounded-full mb-6 backdrop-blur-sm">
          <span className="w-1.5 h-1.5 bg-[#d8c08c] rounded-full animate-pulse" />
          Page not found
        </span>

        <div className="relative mb-5 leading-none">
          <p
            className="absolute inset-0 font-serif text-[clamp(90px,22vw,180px)] font-semibold text-transparent select-none"
            style={{
              WebkitTextStroke: "1px rgba(216,192,140,0.12)",
              transform: "translate(4px,4px)",
            }}
            aria-hidden="true"
          >
            404
          </p>

          <p
            className="font-serif text-[clamp(90px,22vw,180px)] font-semibold tracking-tight"
            style={{
              background:
                "linear-gradient(135deg,#d8c08c 0%,#f5ecd7 50%,#d8c08c 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            404
          </p>
        </div>

        <div className="flex items-center gap-3 max-w-[180px] mx-auto mb-5">
          <div className="flex-1 h-px bg-[#d8c08c]/25" />
          <span className="text-[#d8c08c]/60 text-sm">✦</span>
          <div className="flex-1 h-px bg-[#d8c08c]/25" />
        </div>

        <h1 className="font-serif text-[clamp(20px,4vw,32px)] text-[#f5ecd7] mb-2">
          This room has <em className="text-[#d8c08c] italic">checked out</em>
        </h1>

        <p className="text-[#8a9ab5] text-sm sm:text-base max-w-md mx-auto mb-4">
          The study room you were looking for doesn't seem to exist — or it may have moved to a quieter floor.
        </p>

        <h2 className="text-[#dbe4ee] text-sm sm:text-base mb-6">
          Go back to continue exploring
        </h2>

        <div className="flex flex-wrap gap-3 justify-center">

          <Link
            href="/rooms"
            className="inline-flex items-center gap-2 bg-[#d8c08c] text-[#0f172a] font-medium text-sm px-6 sm:px-7 py-3 rounded-md transition hover:bg-[#e7d2a3] hover:scale-[1.02]"
          >
            <HiArrowLeft />
            Rooms
          </Link>

          <Link
            href="/"
            className="inline-flex items-center gap-2 border border-[#d8c08c]/40 text-[#dbe4ee] text-sm px-6 sm:px-7 py-3 rounded-md transition hover:bg-white/5"
          >
            <FaHome />
            Home
          </Link>

        </div>

      </div>
    </div>
  );
};

export default NotFoundPage;