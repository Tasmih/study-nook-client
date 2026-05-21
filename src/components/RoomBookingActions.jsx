"use client";

import { authClient } from "@/lib/auth-client";
import { bookRoom } from "@/lib/action";
import { Button } from "@heroui/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useMemo, useState } from "react";
import toast from "react-hot-toast";
import { FaArrowAltCircleRight } from "react-icons/fa";

const RoomBookingAction = ({ room, roomId }) => {
  const { data: session, isPending } = authClient.useSession();
  const router = useRouter();

  const user = session?.user;

  const [showForm, setShowForm] = useState(false);
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

  const timeSlots = [
    "08:00",
    "09:00",
    "10:00",
    "11:00",
    "12:00",
    "13:00",
    "14:00",
    "15:00",
    "16:00",
    "17:00",
    "18:00",
    "19:00",
    "20:00",
  ];

  const today = new Date().toISOString().split("T")[0];

  const endTimeOptions = useMemo(() => {
    if (!startTime) return [];

    const startHour = Number(startTime.split(":")[0]);

    return timeSlots.filter((time) => {
      const hour = Number(time.split(":")[0]);
      return hour > startHour;
    });
  }, [startTime, timeSlots]);

  const totalCost = useMemo(() => {
    if (!startTime || !endTime) return 0;

    const startHour = Number(startTime.split(":")[0]);
    const endHour = Number(endTime.split(":")[0]);

    if (endHour <= startHour) return 0;

    return (endHour - startHour) * Number(room?.hourlyRate || 0);
  }, [startTime, endTime, room?.hourlyRate]);

  const handleBooking = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    try {
      const data = await bookRoom(roomId, formData);

      if (data?.insertedId || data?.acknowledged) {
        toast.success("Room booked successfully!");
        setShowForm(false);
        setStartTime("");
        setEndTime("");
        router.refresh();
      }
    } catch (error) {
      toast.error(error?.message || "Booking failed");
    }
  };

  if (isPending) {
    return (
      <p className="text-sm font-medium text-gray-500">
        Checking login status...
      </p>
    );
  }

  return (
    <div className="w-full ">
      {!user ? (
        <Link 
          href={`/login?redirect=/rooms/${roomId}`}
          className="inline-block rounded-lg bg-[#0f172a] px-5 py-2.5 text-sm font-semibold text-[#f5ecd7] shadow-sm transition duration-300 hover:bg-[#d8a84f] hover:text-[#0f172a]"
        >
          <div className="flex gap-2"> Book Now <div className=""><FaArrowAltCircleRight/></div></div>
        </Link>
      ) : (
        <Button
          type="button"
          onClick={() => setShowForm(!showForm)}
          className="rounded-lg bg-[#0f172a] px-5 py-2.5 text-sm font-semibold text-[#f5ecd7] shadow-sm transition duration-300 hover:bg-[#d8a84f] hover:text-[#0f172a]"
        >
          {showForm ? "Close Form" : "Book Now"}
        </Button>
      )}

      {user && showForm && (
        <form
          onSubmit={handleBooking}
          className="mt-4 max-w-3xl rounded-2xl border border-[#eadfca] bg-[#f8f4ea] p-4 shadow-sm"
        >
          <div className="mb-4">
            <h3 className="text-xl font-bold text-[#0f172a]">
              Book This Room
            </h3>
            <p className="mt-1 text-xs text-gray-600">
              Select your preferred date and time slot.
            </p>
          </div>

          {/* Hidden fields */}
          <input type="hidden" name="roomId" value={roomId} />
          <input type="hidden" name="roomName" value={room?.roomName || ""} />
          <input type="hidden" name="roomImage" value={room?.image || ""} />
          <input type="hidden" name="userId" value={user?.id || ""} />
          <input type="hidden" name="userName" value={user?.name || ""} />
          <input type="hidden" name="userEmail" value={user?.email || ""} />

          <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
            <div>
              <label className="mb-1.5 block text-sm font-semibold text-[#0f172a]">
                Date
              </label>

              <input
                required
                type="date"
                name="bookingDate"
                min={today}
                className="w-full rounded-lg border border-[#eadfca] bg-white px-3 py-2 text-sm text-[#0f172a] outline-none transition focus:border-[#d8a84f]"
              />
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-semibold text-[#0f172a]">
                Start Time
              </label>

              <select
                required
                name="startTime"
                value={startTime}
                onChange={(e) => {
                  setStartTime(e.target.value);
                  setEndTime("");
                }}
                className="w-full rounded-lg border border-[#eadfca] bg-white px-3 py-2 text-sm text-[#0f172a] outline-none transition focus:border-[#d8a84f]"
              >
                <option value="">Start time</option>
                {timeSlots.slice(0, -1).map((time) => (
                  <option key={time} value={time}>
                    {time}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-semibold text-[#0f172a]">
                End Time
              </label>

              <select
                required
                name="endTime"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
                disabled={!startTime}
                className="w-full rounded-lg border border-[#eadfca] bg-white px-3 py-2 text-sm text-[#0f172a] outline-none transition focus:border-[#d8a84f] disabled:cursor-not-allowed disabled:bg-gray-100"
              >
                <option value="">End time</option>
                {endTimeOptions.map((time) => (
                  <option key={time} value={time}>
                    {time}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="mt-3">
            <label className="mb-1.5 block text-sm font-semibold text-[#0f172a]">
              Special Note
            </label>

            <textarea
              name="specialNote"
              rows="2"
              placeholder="Optional note"
              className="w-full resize-none rounded-lg border border-[#eadfca] bg-white px-3 py-2 text-sm text-[#0f172a] outline-none transition focus:border-[#d8a84f]"
            />
          </div>

          <div className="mt-3 flex flex-col gap-3 rounded-xl border border-[#eadfca] bg-white p-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-xs text-gray-500">Total Cost</p>
              <h4 className="text-xl font-bold text-[#d8a84f]">
                ${totalCost}
              </h4>
            </div>

            <p className="text-xs text-gray-500">
              {startTime && endTime
                ? `${startTime} - ${endTime} × $${room?.hourlyRate}/hr`
                : `Rate: $${room?.hourlyRate}/hr`}
            </p>
          </div>

          <input type="hidden" name="totalCost" value={totalCost} />

          <Button
            type="submit"
            disabled={!startTime || !endTime || totalCost <= 0}
            className="mt-4 rounded-lg bg-[#0f172a] px-5 py-2.5 text-sm font-semibold text-[#f5ecd7] transition duration-300 hover:bg-[#d8a84f] hover:text-[#0f172a] disabled:cursor-not-allowed disabled:opacity-60"
          >
            Confirm Booking
          </Button>
        </form>
      )}
    </div>
  );
};

export default RoomBookingAction;