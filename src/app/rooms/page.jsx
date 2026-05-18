import RoomCard from "@/components/RoomCard";

const RoomPage = async () => {
  const res = await fetch("http://localhost:5000/room", {
    cache: "no-store",
  });

  const rooms = await res.json();

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">

      
      <h1 className="text-3xl font-bold mb-6">
        All Rooms
      </h1>

    
      {rooms.length === 0 ? (
        <p className="text-center text-gray-500">
          No rooms found
        </p>
      ) : (
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {rooms.map((room) => (
            <RoomCard key={room._id} room={room} />
          ))}
        </div>
      )}

    </div>
  );
};

export default RoomPage;