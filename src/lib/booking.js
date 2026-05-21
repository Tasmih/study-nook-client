export const getMyBookings = async (token) => {
  const res = await fetch(`http://localhost:5000/bookings`, {
    cache: "no-store",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) throw new Error("Failed to fetch bookings");

  return res.json();
};

export const cancelBooking = async (id, token) => {
  const res = await fetch(`http://localhost:5000/bookings/${id}/cancel`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data?.message || "Cancel failed");

  return data;
};