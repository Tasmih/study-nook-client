import { authClient } from "@/lib/auth-client";

export const bookRoom = async (roomId, formData) => {
  const { data: tokenData } = await authClient.token();

  const booking = Object.fromEntries(formData.entries());

  const bookingData = {
    roomId,
    roomName: booking.roomName,
    roomImage: booking.roomImage,
    bookingDate: booking.bookingDate,
    startTime: booking.startTime,
    endTime: booking.endTime,
    totalCost: Number(booking.totalCost),
    specialNote: booking.specialNote || "",
  };

  const res = await fetch("http://localhost:5000/bookings", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${tokenData?.token}`,
    },
    body: JSON.stringify(bookingData),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Booking failed");
  }

  return data;
};

export const getMyRooms = async (userId) => {
  const res = await fetch(
    `http://localhost:5000/room?owner=${userId}`
  );

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Failed to load rooms");
  }

  return data;
};

export const deleteRoom = async (roomId, userId) => {
  const { data: tokenData } = await authClient.token();

  const res = await fetch(
    `http://localhost:5000/room/${roomId}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${tokenData?.token}`,
      },
      body: JSON.stringify({ userId }),
    }
  );

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Delete failed");
  }

  return data;
};