"use client";

import { toast } from "react-toastify";
import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import { FaTimesCircle } from "react-icons/fa";

export default function BookingCard({ booking }) {
  const [loading, setLoading] = useState(false);

const handleCancel = async () => {
  setLoading(true);

  try {
    const { data: tokenData } = await authClient.token();

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/bookings/${booking._id}/cancel`,
      {
        method: "PATCH",
        headers: {
          "content-type": "application/json",
          authorization: `Bearer ${tokenData?.token}`,
        },
      }
    );

    const data = await res.json();

    if (!res.ok) throw new Error(data.message);

    toast.success("Booking cancelled", {
      icon: <FaCheckCircle />,
    });

    window.location.reload();

  } catch (err) {
    toast.error(err.message, {
      icon: <FaTimesCircle />,
    });
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