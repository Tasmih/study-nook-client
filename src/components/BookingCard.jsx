"use client";

import { toast } from "react-toastify";
import { useState } from "react";

export default function BookingCard({ booking }) {
  const [loading, setLoading] = useState(false);

  const handleCancel = async () => {
    setLoading(true);

    try {
      const res = await fetch(
        `/api/bookings/${booking._id}/cancel`,
        {
          method: "PATCH",
        }
      );

      const data = await res.json();

      if (!res.ok) throw new Error(data.message);

      toast.success("Booking cancelled");

      // optional: UI remove instantly
      window.location.reload();

    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="border p-4 rounded flex justify-between items-center">
      <div>
        <h2 className="font-semibold">{booking.roomName}</h2>
        <p className="text-sm text-gray-500">
          Status: {booking.status}
        </p>
      </div>

      <button
        onClick={handleCancel}
        disabled={loading}
        className="bg-red-500 text-white px-3 py-1 rounded"
      >
        {loading ? "Cancelling..." : "Cancel"}
      </button>
    </div>
  );
}