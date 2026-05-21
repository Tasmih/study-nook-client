export const getMyBookings = async (userId) => {
  const res = await fetch(`http://localhost:5000/bookings/${userId}`, {
    cache: "no-store",
  });

  if (!res.ok) throw new Error("Failed to fetch bookings");

  return res.json();
};

export const cancelBooking = async (id, userId) => {
  const res = await fetch(
    `http://localhost:5000/bookings/${id}/cancel`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: userId?.toString(),
      }),
    }
  );

  const data = await res.json();

  if (!res.ok) throw new Error(data?.message || "Cancel failed");

  return data;
};