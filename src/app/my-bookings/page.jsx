"use client";

import { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";
import { getMyBookings, cancelBooking } from "@/lib/booking";
import Image from "next/image";
import { motion } from "framer-motion";
import { toast } from "react-toastify";

const MyBookingsPage = () => {
  const { data: session } = authClient.useSession();
  const user = session?.user;

  const [token, setToken] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    authClient.token().then(({ data }) => {
      setToken(data?.token);
    });
  }, []);

  useEffect(() => {
    const load = async () => {
      if (!token) return;

      try {
        const data = await getMyBookings(token);
        setBookings(data);
      } catch (err) {
        console.log(err);
        toast.error("Failed to load bookings");
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [token]);

  const handleCancel = async (id) => {
    try {
      await cancelBooking(id, token);

      setBookings((prev) =>
        prev.map((booking) =>
          booking._id === id ? { ...booking, status: "cancelled" } : booking
        )
      );

      toast.success("Booking cancelled");
    } catch (err) {
      console.log(err);
      toast.error("Failed to cancel booking");
    }
  };

  const canCancel = (booking) => {
    return booking.status === "confirmed";
  };

  if (!user) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center">
        <p className="text-red-500 text-lg">Please login first</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-blue-50 to-white">
      <div className="max-w-7xl mx-auto px-4 py-10">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-[#0f172a]">My Bookings</h1>
          <p className="mt-2 text-gray-500">All your booked study rooms</p>
        </div>

        {loading && (
          <div className="mt-10 text-center">
            <p className="text-gray-500">Loading bookings...</p>
          </div>
        )}

        {!loading && bookings.length === 0 && (
          <div className="mt-16 text-center">
            <p className="text-gray-500 text-lg">You have no bookings yet.</p>
          </div>
        )}

        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {bookings.map((booking, index) => (
            <motion.div
              key={booking._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="rounded-2xl overflow-hidden border bg-white shadow-sm hover:shadow-lg duration-300"
            >
              <div className="relative h-[180px]">
                <Image
                  src={booking.roomImage}
                  alt={booking.roomName}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="p-5">
                <h2 className="text-xl font-bold">{booking.roomName}</h2>

                <p className="mt-2 text-sm text-gray-500">
                  Date: {booking.bookingDate}
                </p>

                <p className="text-sm text-gray-500">
                  Time: {booking.startTime} - {booking.endTime}
                </p>

                <p className="mt-3 font-semibold text-[#d8a84f]">
                  ${booking.totalCost}
                </p>

                <div className="mt-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      booking.status === "confirmed"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-600"
                    }`}
                  >
                    {booking.status}
                  </span>
                </div>

                {canCancel(booking) && (
                  <button
                    onClick={() => handleCancel(booking._id)}
                    className="mt-5 w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 duration-300"
                  >
                    Cancel Booking
                  </button>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MyBookingsPage;