// components/HowItWorks.jsx
"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { BsSearch } from "react-icons/bs";
import { LuCalendarCheck } from "react-icons/lu";
import { MdOutlinePayment } from "react-icons/md";
import { PiStudentBold } from "react-icons/pi";

const steps = [
  {
    icon: <BsSearch size={26} />,
    step: "01",
    title: "Browse Rooms",
    desc: "Explore our available study rooms. Filter by floor, capacity, or amenities to find your perfect space.",
  },
  {
    icon: <LuCalendarCheck size={26} />,
    step: "02",
    title: "Pick Your Slot",
    desc: "Choose a date and time that works for you. Our real-time availability makes it easy.",
  },
  {
    icon: <MdOutlinePayment size={26} />,
    step: "03",
    title: "Confirm Booking",
    desc: "Review your booking details and confirm. You'll get an instant confirmation right away.",
  },
  {
    icon: <PiStudentBold size={26} />,
    step: "04",
    title: "Start Studying",
    desc: "Show up, settle in, and get to work. Everything is ready and waiting for you.",
  },
];

const HowItWorks = () => {
  return (
    <section className="bg-white py-16 md:py-20">
      <div className="max-w-7xl mx-auto px-4">

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-10 md:mb-14"
        >
          <h2 className="text-3xl font-bold text-[#0f172a]">
            
            How it Works
          
          </h2>
          <p className="text-gray-500 mt-3 max-w-xl mx-auto text-sm leading-6">
            Getting your perfect study space is just four simple steps away.
          </p>
        </motion.div>

       
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: idx * 0.15 }}
              viewport={{ once: true }}
              whileHover={{ y: -6, transition: { duration: 0.2 } }}
              className="relative bg-white rounded-2xl p-6 border border-[#eadfca] shadow-sm hover:shadow-lg transition-shadow duration-300 flex flex-col h-full"
            >
              
              <p className="text-5xl font-bold text-[#d8a84f]/20 leading-none mb-4">
                {item.step}
              </p>

            
              <div className="w-14 h-14 rounded-xl bg-[#0f172a] flex items-center justify-center text-[#d8a84f] mb-5 shrink-0">
                {item.icon}
              </div>

            
              {idx < steps.length - 1 && (
                <div className="hidden lg:block absolute top-10 -right-3 w-6 h-[2px] bg-[#eadfca] z-10" />
              )}

              <h3 className="text-xl font-bold text-[#0f172a] mb-2">
                {item.title}
              </h3>
              <p className="text-sm text-gray-500 leading-6">
                {item.desc}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Link
            href="/rooms"
            className="inline-block rounded-xl bg-[#0f172a] px-8 py-3 text-sm font-medium text-[#f5ecd7] transition duration-300 hover:bg-[#d8a84f] hover:text-[#0f172a]"
          >
            Book a Room Now →
          </Link>
        </motion.div>

      </div>
    </section>
  );
};

export default HowItWorks;