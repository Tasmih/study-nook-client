"use client";

import Link from "next/link";

const Banner = () => {
  return (
    <section
      className="relative min-h-[85vh] flex items-center justify-center bg-cover bg-center"
      style={{
        backgroundImage: "url('/images/Banner6.png')",
      }}
    >
      
      <div className="absolute inset-0 bg-black/40"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 w-full">
        <div className="max-w-3xl">
  
          <p className="mb-4 inline-block rounded-full border border-white/20 bg-white/10 px-4 py-1 text-sm tracking-wide text-[#f5ecd7] backdrop-blur-sm">
            Quiet • Private • Comfortable
          </p>

      
          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-semibold leading-tight text-[#f5ecd7]">
            Find Your Perfect{" "}
            <span className="text-[#d8c08c] italic">Study Room</span>
          </h1>

          
          <p className="mt-6 max-w-2xl text-base sm:text-lg lg:text-xl leading-8 text-[#dbe4ee]">
            Browse and book quiet, private study rooms in your library.
            List your own room and earn.
          </p>

        
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Link
              href="/rooms"
              className="rounded-md bg-[#d8c08c] px-7 py-3 text-base font-medium text-[#0f172a] shadow-lg transition duration-300 hover:bg-[#e7d2a3] hover:scale-[1.02]"
            >
              Explore Rooms
            </Link>

            <Link
              href="/add-room"
              className="rounded-md border border-[#d8c08c]/60 px-7 py-3 text-base font-medium text-[#f5ecd7] transition duration-300 hover:bg-[#ffffff14]"
            >
              List Your Room
            </Link>
          </div>

          {/* Extra info badges */}
          <div className="mt-10 flex flex-wrap gap-3">
            <span className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-[#dbe4ee] backdrop-blur-sm">
              Peaceful Environment
            </span>
            <span className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-[#dbe4ee] backdrop-blur-sm">
              Easy Booking
            </span>
            <span className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-[#dbe4ee] backdrop-blur-sm">
              Earn by Listing
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Banner;