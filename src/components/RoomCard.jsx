import Image from "next/image";
import Link from "next/link";

const RoomCard = ({ room }) => {
  const {
    _id,
    roomName,
    description,
    image,
    capacity,
    hourlyRate,
    amenities = [],
    floor,
  } = room;

  const shortDesc =
    description?.length > 100 ? description.slice(0, 100) + "..." : description;

  const visibleAmenities = amenities.slice(0, 3);
  const extraCount = amenities.length - 3;

  return (
    <div className="border overflow-hidden flex flex-col h-full rounded-2xl bg-[rgba(10,20,45,0.92)] backdrop-blur-xl shadow-[0_4px_24px_rgba(0,0,0,0.4)] hover:shadow-[0_8px_32px_rgba(0,0,0,0.6)] hover:-translate-y-0.5 transition-all duration-300 border-yellow-500/20 w-full">

      <div className="relative h-56 w-full overflow-hidden">
        <Image
          src={image || "/placeholder.png"}
          alt={roomName}
          fill
          className="object-cover"
        />
        <div className="absolute top-4 right-4 rounded-full bg-[#0f172a]/90 px-4 py-2 text-sm font-semibold text-[#d8c08c] border border-yellow-500/30 backdrop-blur-sm">
          ${hourlyRate}/hr
        </div>
      </div>

      <div className="p-6 flex flex-col flex-1 justify-between">

        <div className="flex flex-col gap-0">
          <h2 className="text-xl font-semibold text-[#f5ecd7]">{roomName}</h2>

          <p className="mt-3 text-sm leading-6 text-white/50">{shortDesc}</p>

          <div className="mt-5 grid grid-cols-2 gap-3 text-sm">
            <div className="rounded-lg border border-yellow-500/20 bg-white/5 p-3">
              <p className="text-white/40">Floor</p>
              <p className="font-semibold text-[#f5ecd7]">{floor}</p>
            </div>
            <div className="rounded-lg border border-yellow-500/20 bg-white/5 p-3">
              <p className="text-white/40">Capacity</p>
              <p className="font-semibold text-[#f5ecd7]">{capacity} People</p>
            </div>
          </div>

          <div className="mt-5 flex flex-wrap gap-2">
            {visibleAmenities.map((amenity, idx) => (
              <span
                key={idx}
                className="rounded-full border border-yellow-500/20 bg-white/5 px-3 py-1 text-xs font-medium text-[#d8c08c]"
              >
                {amenity}
              </span>
            ))}
            {extraCount > 0 && (
              <span className="rounded-full border border-yellow-500/20 bg-white/5 px-3 py-1 text-xs font-medium text-white/40">
                +{extraCount} more
              </span>
            )}
          </div>
        </div>

        <div className="pt-6">
          <Link
            href={`/rooms/${_id}`}
            className="block w-full rounded-xl bg-[#d8c08c] px-5 py-3 text-center font-medium text-[#0f172a] transition duration-300 hover:bg-[#e7d2a3] hover:scale-[1.02]"
          >
            View Details
          </Link>
        </div>

      </div>
    </div>
  );
};

export default RoomCard;