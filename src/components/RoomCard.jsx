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
    description?.length > 100
      ? description.slice(0, 100) + "..."
      : description;

  
  const visibleAmenities = amenities.slice(0, 3);
  const extraCount = amenities.length - 3;

  return (
    <div className="border overflow-hidden flex flex-col h-full group rounded-2xl bg-white shadow-md hover:shadow-2xl transition-all duration-300 border-[#eadfca] w-full">

      <div className="relative h-56 w-full overflow-hidden">
        <Image
  src={image || "/placeholder.png"}
  alt={roomName}
  fill
  className="object-cover"
/>

      
        <div className="absolute top-4 right-4 rounded-full bg-[#0f172a]/90 px-4 py-2 text-sm font-semibold text-[#f5ecd7] backdrop-blur-sm">
          ${hourlyRate}/hr
        </div>
      </div>

      <div className="p-6 flex flex-col flex-1">
        <h2 className="text-xl font-bold text-[#0f172a]">
          {roomName}
        </h2>

        <p className="mt-3 text-sm leading-6 text-gray-600">
          {shortDesc}
        </p>

    
        <div className="mt-5 grid grid-cols-2 gap-3 text-sm">
          <div className="rounded-lg bg-[#f8f4ea] p-3">
            <p className="text-gray-500">Floor</p>
            <p className="font-semibold text-[#0f172a]">{floor}</p>
          </div>

          <div className="rounded-lg bg-[#f8f4ea] p-3">
            <p className="text-gray-500">Capacity</p>
            <p className="font-semibold text-[#0f172a]">
              {capacity} People
            </p>
          </div>
        </div>

        
        <div className="mt-5 flex flex-wrap gap-2">
          {visibleAmenities.map((amenity, idx) => (
            <span
              key={idx}
              className="rounded-full bg-[#0f172a]/10 px-3 py-1 text-xs font-medium text-[#0f172a]"
            >
              {amenity}
            </span>
          ))}

          {extraCount > 0 && (
            <span className="rounded-full bg-[#d8a84f]/20 px-3 py-1 text-xs font-medium text-[#8a661f]">
              +{extraCount} more
            </span>
          )}
        </div>

       
        <div className="mt-6">
          <Link
            href={`/rooms/${_id}`}
            className="block w-full rounded-xl bg-[#0f172a] px-5 py-3 text-center font-medium text-[#f5ecd7] transition duration-300 hover:bg-[#d8a84f] hover:text-[#0f172a]"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RoomCard;