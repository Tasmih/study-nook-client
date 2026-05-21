export const bookRoom = async (roomId, formData) => {
  const booking = Object.fromEntries(formData.entries());

  const bookingData = {
    roomId,
    roomName: booking.roomName,
    roomImage: booking.roomImage,
    userId: booking.userId,
    userName: booking.userName,
    userEmail: booking.userEmail,
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
    },
    body: JSON.stringify(bookingData),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Booking failed");
  }

  return data;
};