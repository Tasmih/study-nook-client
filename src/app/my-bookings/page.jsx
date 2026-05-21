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

  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const [showModal, setShowModal] = useState(false);
  const [selectedBookingId, setSelectedBookingId] =
    useState(null);

  useEffect(() => {
    const loadBookings = async () => {
      if (!user?.id) return;

      try {
        const data = await getMyBookings(
          user.id
        );

        setBookings(data);
      } catch (error) {
        console.log(error);
        toast.error(
          "Failed to load bookings"
        );
      } finally {
        setLoading(false);
      }
    };

    loadBookings();
  }, [user?.id]);

  const openCancelModal = (id) => {
    setSelectedBookingId(id);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedBookingId(null);
  };

  const handleCancel = async () => {
    try {
      await cancelBooking(
        selectedBookingId,
        user.id
      );

      setBookings((prev) =>
        prev.filter(
          (booking) =>
            booking._id !== selectedBookingId
        )
      );

      toast.success(
        "Booking cancelled"
      );

      closeModal();
    } catch (error) {
      console.log(error);

      toast.error(
        "Failed to cancel booking"
      );
    }
  };

  if (!user) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center px-4">
        <p className="text-lg text-red-500 text-center">
          Please login first
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">

      <h1 className="text-3xl font-bold text-[#0f172a]">
        My Bookings
      </h1>

      <p className="mt-2 text-gray-500">
        All your booked study rooms
      </p>

      {loading && (
        <div className="mt-10 text-center">
          <p className="text-gray-500">
            Loading bookings...
          </p>
        </div>
      )}

      {!loading &&
        bookings.length === 0 && (
          <div className="mt-16 text-center">
            <p className="text-lg text-gray-500">
              You have no bookings yet.
            </p>
          </div>
        )}

      {!loading &&
        bookings.length > 0 && (
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

            {bookings.map(
              (
                booking,
                index
              ) => (
                <motion.div
                  key={
                    booking._id
                  }
                  initial={{
                    opacity: 0,
                    y: 20,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  transition={{
                    delay:
                      index *
                      0.05,
                  }}
                  className="rounded-2xl overflow-hidden border bg-white shadow-sm hover:shadow-lg duration-300"
                >
                  <div className="relative h-[180px]">

                    <Image
                      src={
                        booking.roomImage
                      }
                      alt={
                        booking.roomName
                      }
                      fill
                      className="object-cover"
                    />

                  </div>

                  <div className="p-5">

                    <h2 className="text-xl font-bold line-clamp-1">
                      {
                        booking.roomName
                      }
                    </h2>

                    <p className="mt-2 text-sm text-gray-500">
                      Date:{" "}
                      {
                        booking.bookingDate
                      }
                    </p>

                    <p className="text-sm text-gray-500">
                      Time:{" "}
                      {
                        booking.startTime
                      }{" "}
                      -
                      {" "}
                      {
                        booking.endTime
                      }
                    </p>

                    <p className="mt-3 font-semibold text-[#d8a84f]">
                      $
                      {
                        booking.totalCost
                      }
                    </p>

                    <button
                      onClick={() =>
                        openCancelModal(
                          booking._id
                        )
                      }
                      className="mt-5 w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 duration-300"
                    >
                      Cancel
                    </button>

                  </div>
                </motion.div>
              )
            )}

          </div>
        )}

      {showModal && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center px-4">

          <div className="bg-white w-full max-w-sm rounded-xl p-6">

            <h2 className="text-xl font-bold">
              Cancel Booking
            </h2>

            <p className="mt-2 text-gray-500">
              Are you sure you want to cancel this booking?
            </p>

            <div className="mt-6 flex gap-3">

              <button
                onClick={
                  closeModal
                }
                className="flex-1 border py-2 rounded-lg"
              >
                No
              </button>

              <button
                onClick={
                  handleCancel
                }
                className="flex-1 bg-red-500 text-white py-2 rounded-lg hover:bg-red-600"
              >
                Yes, Cancel
              </button>

            </div>

          </div>

        </div>
      )}

    </div>
  );
};

export default MyBookingsPage;