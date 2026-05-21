"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiX, FiCalendar, FiClock, FiFileText, FiCheckCircle } from "react-icons/fi";
import { LuSparkles } from "react-icons/lu";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client"; // ✅ নতুন

const TIME_SLOTS = [
  "08:00","09:00","10:00","11:00","12:00",
  "13:00","14:00","15:00","16:00","17:00",
  "18:00","19:00","20:00",
];

const backdropVariants = {
  hidden:  { opacity: 0 },
  visible: { opacity: 1 },
  exit:    { opacity: 0 },
};

const modalVariants = {
  hidden:  { opacity: 0, y: 60, scale: 0.96 },
  visible: { 
    opacity: 1, y: 0, scale: 1,
    transition: { type: "spring", stiffness: 320, damping: 28, delay: 0.05 }
  },
  exit:    { opacity: 0, y: 40, scale: 0.97, transition: { duration: 0.2 } },
};

const fieldVariants = {
  hidden:  { opacity: 0, y: 16 },
  visible: (i) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.07 + 0.15, duration: 0.35, ease: "easeOut" }
  }),
};

export default function BookingModal({ room, user, onClose }) {
  const [bookingDate, setBookingDate] = useState("");
  const [startTime, setStartTime]     = useState("");
  const [endTime, setEndTime]         = useState("");
  const [specialNote, setSpecialNote] = useState("");
  const [loading, setLoading]         = useState(false);

  const today = new Date().toISOString().split("T")[0];

  const endTimeOptions = startTime
    ? TIME_SLOTS.filter((t) => t > startTime)
    : [];

  useEffect(() => {
    if (endTime && endTime <= startTime) setEndTime("");
  }, [startTime]);

  const hours = startTime && endTime
    ? Number(endTime.split(":")[0]) - Number(startTime.split(":")[0])
    : 0;

  const totalCost = hours * (room?.hourlyRate || 0);

  const handleSubmit = async () => {
    if (!bookingDate || !startTime || !endTime) {
      toast.error("Date, start time and end time are required!");
      return;
    }

    setLoading(true);
    try {
      const { data: tokenData } = await authClient.token(); 

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/bookings`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${tokenData.token}`, 
        },
        body: JSON.stringify({
          roomId: room._id,
          roomName: room.roomName,
          roomImage: room.image,
          userId: user?.id,
          userName: user?.name,
          userEmail: user?.email,
          bookingDate,
          startTime,
          endTime,
          totalCost,
          specialNote,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message || "Booking failed!");
        return;
      }

      toast.success("Room booked successfully! 🎉");
      onClose();
    } catch {
      toast.error("Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        key="backdrop"
        variants={backdropVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        transition={{ duration: 0.25 }}
        className="fixed inset-0 z-50 flex items-center justify-center px-4"
        style={{ background: "rgba(15,23,42,0.65)", backdropFilter: "blur(4px)" }}
        onClick={onClose}
      >
        <motion.div
          key="modal"
          variants={modalVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="relative w-full max-w-md overflow-hidden rounded-3xl shadow-2xl"
          style={{ background: "#fefcf7", border: "1px solid #eadfca" }}
          onClick={(e) => e.stopPropagation()}
        >
          <div
            className="h-1 w-full"
            style={{ background: "linear-gradient(90deg, #d8a84f, #f0c878, #d8a84f)" }}
          />

          <div className="p-6 md:p-8">

            <motion.div
              custom={0}
              variants={fieldVariants}
              initial="hidden"
              animate="visible"
              className="flex justify-between items-start mb-6"
            >
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <LuSparkles size={14} className="text-[#d8a84f]" />
                  <span className="text-xs font-medium text-[#8a661f] tracking-wider uppercase">
                    StudyNook
                  </span>
                </div>
                <h2 className="text-2xl font-bold text-[#0f172a]">Reserve Your Spot</h2>
              </div>
              <motion.button
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.2 }}
                onClick={onClose}
                className="rounded-full p-2 text-gray-400 hover:bg-[#f0ebe0] hover:text-[#0f172a] transition-colors"
              >
                <FiX size={18} />
              </motion.button>
            </motion.div>

            <motion.div
              custom={1}
              variants={fieldVariants}
              initial="hidden"
              animate="visible"
              className="flex items-center gap-4 rounded-2xl px-5 py-4 mb-6"
              style={{ background: "#f8f4ea", border: "1px solid #eadfca" }}
            >
              <div className="flex-1">
                <p className="font-semibold text-[#0f172a]">{room?.roomName}</p>
                <p className="text-sm text-[#8a661f] mt-0.5">৳ {room?.hourlyRate} / hour</p>
              </div>
              <span
                className="rounded-full px-3 py-1 text-xs font-semibold"
                style={{ background: "#d8a84f22", color: "#8a661f" }}
              >
                Floor {room?.floor}
              </span>
            </motion.div>

            <motion.div
              custom={2}
              variants={fieldVariants}
              initial="hidden"
              animate="visible"
              className="mb-4"
            >
              <label className="flex items-center gap-1.5 text-xs font-medium text-gray-500 mb-1.5">
                <FiCalendar size={12} /> Date
              </label>
              <input
                type="date"
                min={today}
                value={bookingDate}
                onChange={(e) => setBookingDate(e.target.value)}
                className="w-full rounded-xl px-4 py-2.5 text-sm text-[#0f172a] outline-none transition"
                style={{
                  border: "1px solid #eadfca",
                  background: "#fff",
                  boxShadow: "inset 0 1px 3px rgba(0,0,0,0.04)",
                }}
                onFocus={(e) => (e.target.style.borderColor = "#d8a84f")}
                onBlur={(e) => (e.target.style.borderColor = "#eadfca")}
              />
            </motion.div>

            <motion.div
              custom={3}
              variants={fieldVariants}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-2 gap-3 mb-4"
            >
              <div>
                <label className="flex items-center gap-1.5 text-xs font-medium text-gray-500 mb-1.5">
                  <FiClock size={12} /> Start Time
                </label>
                <select
                  value={startTime}
                  onChange={(e) => setStartTime(e.target.value)}
                  className="w-full rounded-xl px-3 py-2.5 text-sm text-[#0f172a] outline-none transition"
                  style={{ border: "1px solid #eadfca", background: "#fff" }}
                  onFocus={(e) => (e.target.style.borderColor = "#d8a84f")}
                  onBlur={(e) => (e.target.style.borderColor = "#eadfca")}
                >
                  <option value="">Select</option>
                  {TIME_SLOTS.slice(0, -1).map((t) => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="flex items-center gap-1.5 text-xs font-medium text-gray-500 mb-1.5">
                  <FiClock size={12} /> End Time
                </label>
                <select
                  value={endTime}
                  onChange={(e) => setEndTime(e.target.value)}
                  disabled={!startTime}
                  className="w-full rounded-xl px-3 py-2.5 text-sm text-[#0f172a] outline-none transition disabled:opacity-40"
                  style={{ border: "1px solid #eadfca", background: "#fff" }}
                  onFocus={(e) => (e.target.style.borderColor = "#d8a84f")}
                  onBlur={(e) => (e.target.style.borderColor = "#eadfca")}
                >
                  <option value="">Select</option>
                  {endTimeOptions.map((t) => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
              </div>
            </motion.div>

            <motion.div
              custom={4}
              variants={fieldVariants}
              initial="hidden"
              animate="visible"
              className="mb-5"
            >
              <label className="flex items-center gap-1.5 text-xs font-medium text-gray-500 mb-1.5">
                <FiFileText size={12} /> Special Note
                <span className="text-gray-400">(optional)</span>
              </label>
              <textarea
                rows={2}
                value={specialNote}
                onChange={(e) => setSpecialNote(e.target.value)}
                placeholder="Anything we should know..."
                className="w-full rounded-xl px-4 py-2.5 text-sm text-[#0f172a] resize-none outline-none transition"
                style={{
                  border: "1px solid #eadfca",
                  background: "#fff",
                  fontFamily: "inherit",
                }}
                onFocus={(e) => (e.target.style.borderColor = "#d8a84f")}
                onBlur={(e) => (e.target.style.borderColor = "#eadfca")}
              />
            </motion.div>

            <AnimatePresence>
              {hours > 0 && (
                <motion.div
                  key="cost"
                  initial={{ opacity: 0, height: 0, marginBottom: 0 }}
                  animate={{ opacity: 1, height: "auto", marginBottom: 20 }}
                  exit={{ opacity: 0, height: 0, marginBottom: 0 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  className="flex justify-between items-center rounded-2xl px-5 py-3.5 overflow-hidden"
                  style={{ background: "#f8f4ea", border: "1px solid #eadfca" }}
                >
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <FiCheckCircle size={14} className="text-[#d8a84f]" />
                    {hours} hr{hours > 1 ? "s" : ""} × ৳{room?.hourlyRate}
                  </div>
                  <motion.span
                    key={totalCost}
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: "spring", stiffness: 400, damping: 20 }}
                    className="text-lg font-bold text-[#d8a84f]"
                  >
                    ৳ {totalCost}
                  </motion.span>
                </motion.div>
              )}
            </AnimatePresence>

            <motion.button
              custom={5}
              variants={fieldVariants}
              initial="hidden"
              animate="visible"
              whileHover={{ scale: 1.02, boxShadow: "0 6px 24px rgba(216,168,79,0.35)" }}
              whileTap={{ scale: 0.98 }}
              onClick={handleSubmit}
              disabled={loading}
              className="w-full rounded-2xl py-3 text-sm font-semibold tracking-wide transition disabled:opacity-60"
              style={{ background: "#0f172a", color: "#f5ecd7" }}
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <motion.span
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 0.8, ease: "linear" }}
                    className="inline-block w-4 h-4 border-2 border-[#f5ecd7]/30 border-t-[#f5ecd7] rounded-full"
                  />
                  Booking...
                </span>
              ) : (
                "Confirm Booking →"
              )}
            </motion.button>

          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}