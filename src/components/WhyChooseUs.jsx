// components/WhyChooseUs.jsx
"use client";

import { motion } from "framer-motion";
import {
  BsBookHalf,
  BsLightningChargeFill,
  BsShieldLockFill,
  BsWifi,
} from "react-icons/bs";
import { MdOutlineChair } from "react-icons/md";
import { IoPricetagOutline } from "react-icons/io5";

const features = [
  {
    icon: <BsBookHalf size={28} />,
    title: "Quiet & Focused",
    desc: "Designed for deep work. No noise, no distractions — just you and your goals.",
  },
  {
    icon: <BsLightningChargeFill size={28} />,
    title: "Book in Minutes",
    desc: "Simple booking process. Pick a room, choose your slot, and you're set.",
  },
  {
    icon: <MdOutlineChair size={28} />,
    title: "Premium Comfort",
    desc: "Ergonomic chairs, proper lighting, and everything you need to stay productive.",
  },
  {
    icon: <BsShieldLockFill size={28} />,
    title: "Private & Secure",
    desc: "Your sessions are yours alone. Private rooms with secure access every time.",
  },
  {
    icon: <IoPricetagOutline size={28} />,
    title: "Affordable Rates",
    desc: "Hourly pricing that fits your budget. No hidden fees, no surprises.",
  },
  {
    icon: <BsWifi size={28} />,
    title: "High-Speed WiFi",
    desc: "Blazing fast internet so your workflow never slows down.",
  },
];

const WhyChooseUs = () => {
  return (
    <section className="bg-[#f8f4ea] py-16 md:py-20">
      <div className="max-w-7xl mx-auto px-4">

       
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-10 md:mb-14"
        >
          <h2 className="text-3xl font-bold text-[#0f172a]">
            Why Choose StudyNook?
          </h2>
          <p className="text-gray-500 mt-3 max-w-xl mx-auto text-sm leading-6">
            Everything you need for a productive study session — all under one roof.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -6, transition: { duration: 0.2 } }}
              className="bg-white rounded-2xl p-6 border border-[#eadfca] shadow-sm hover:shadow-lg transition-shadow duration-300 flex flex-col h-full"
            >
              
              <div className="w-14 h-14 rounded-xl bg-[#0f172a] flex items-center justify-center text-[#d8a84f] mb-5 shrink-0">
                {feature.icon}
              </div>

              <h3 className="text-xl font-bold text-[#0f172a] mb-2">
                {feature.title}
              </h3>
              <p className="text-sm text-gray-500 leading-6">
                {feature.desc}
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default WhyChooseUs;