"use client";

import {
  Button,
  Input,
  Label,
  TextArea,
  Card,
} from "@heroui/react";

export default function AddRoomPage() {
  const onSubmit =async (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const room = {
      roomName: formData.get("roomName"),
      floor: formData.get("floor"),
      capacity: formData.get("capacity"),
      hourlyRate: formData.get("hourlyRate"),
      image: formData.get("image"),
      description: formData.get("description"),
      amenities: formData.getAll("amenities"),
    };

    console.log("ROOM DATA:", room);

    const res =await fetch('http://localhost:5000/room',{
      method:'POST',
      headers:{
        'content-type':'application/json'
      },
      body:JSON.stringify(room)
    })
    const data = await res.json()
    console.log (data)
    
  };


  return (
    <div className="min-h-screen bg-blue-950 text-white flex justify-center p-5 max-w-7xl mx-auto mt-4 px-4 py-10">

      <Card className="w-full max-w-4xl bg-white/10 border border-white/10 rounded-2xl">

   
        <div className="p-6 border-b border-white/10">
          <h2 className="text-2xl font-bold text-yellow-400">
            Add Study Room
          </h2>
        </div>

      
        <form onSubmit={onSubmit} className="p-10 space-y-8 max-w-3xl">

        
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

            <div>
              <Label className="text-gray-200">Room Name</Label>
              <Input
                name="roomName"
                placeholder="Silent Study Room A"
                className="bg-white text-black rounded-xl mt-1 w-full"
              />
            </div>

            <div>
              <Label className="text-gray-200">Floor</Label>
              <Input
                name="floor"
                placeholder="3rd Floor"
                className="bg-white text-black rounded-xl mt-1 w-full"
              />
            </div>

          </div>

      
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

            <div>
              <Label className="text-gray-200">Capacity</Label>
              <Input
                name="capacity"
                type="number"
                placeholder="4 people"
                className="bg-white text-black rounded-xl mt-1 w-full"
              />
            </div>

            <div>
              <Label className="text-gray-200">Hourly Rate</Label>
              <Input
                name="hourlyRate"
                type="number"
                placeholder="5"
                className="bg-white text-black rounded-xl mt-1 w-full"
              />
            </div>

          </div>

          <div>
            <Label className="text-gray-200">Image URL</Label>
            <Input
              name="image"
              placeholder="https://example.com/room.jpg"
              className="bg-white text-black rounded-xl mt-1 w-full"
            />
          </div>

         
          <div>
            <Label className="text-gray-200">Description</Label>
            <textarea
              name="description"
              placeholder="Describe the study room..."
              className="bg-white text-black rounded-xl mt-1 w-full"
            />
          </div>

          <div>
            <Label className="text-gray-200">Amenities</Label>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-2 text-sm">

              {["Wi-Fi", "Whiteboard", "Projector", "Power Outlets", "Quiet Zone", "AC"].map(
                (item) => (
                  <label
                    key={item}
                    className="flex items-center gap-2 bg-white/10 px-3 py-2 rounded-lg"
                  >
                    <input type="checkbox" name="amenities" value={item} />
                    {item}
                  </label>
                )
              )}

            </div>
          </div>

      
          <Button
            type="submit"
            className="w-full bg-yellow-500 text-black font-semibold py-3 rounded-xl hover:bg-yellow-400 transition"
          >
            Add Room
          </Button>

        </form>

      </Card>

    </div>
  );
}