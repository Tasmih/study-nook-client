export const getMyBookings = async (userId) => {
  const res = await fetch(`http://localhost:5000/bookings/${userId}`, {
    cache: "no-store",
  });

  if (!res.ok) throw new Error("Failed to fetch bookings");

  return res.json();
};

export const cancelBooking = async (id, userId) => {
  const res = await fetch(`http://localhost:5000/bookings/${id}/cancel`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ userId }),
  });

  if (!res.ok) throw new Error("Cancel failed");

  return res.json();
};