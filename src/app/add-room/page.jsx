"use client";

import { Button, Input, Card, Label } from "@heroui/react";
import {
  Wifi, PenLine, Monitor, Plug, VolumeX, Wind, BookOpen,
  DoorOpen, Layers, Users, DollarSign, ImageIcon, FileText, Plus,
} from "lucide-react";

const amenityIcons = {
  "Wi-Fi": Wifi,
  "Whiteboard": PenLine,
  "Projector": Monitor,
  "Power Outlets": Plug,
  "Quiet Zone": VolumeX,
  "AC": Wind,
};

export default function AddRoomPage() {
  const onSubmit = async (e) => {
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

    const res = await fetch("http://localhost:5000/room", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(room),
    });

    const data = await res.json();
    console.log(data);
  };

  return (
    <div className="min-h-screen flex justify-center items-start px-4 py-10 bg-[url('/Banner6.png')] bg-cover bg-center relative">

      <div className="absolute inset-0 bg-[#0a0f1e]/80" />

      <div className="relative z-10 w-full flex justify-center">
        <Card className="w-full max-w-4xl bg-[rgba(13,27,53,0.88)] border border-yellow-600/30 rounded-2xl backdrop-blur-xl shadow-[0_10px_48px_rgba(0,0,0,0.6)]">

          <div className="p-6 border-b border-yellow-600/30 flex items-center gap-3 bg-gradient-to-r from-yellow-400/8 to-transparent">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-yellow-400 to-yellow-700 text-[#0a0f1e] shadow-lg shadow-yellow-500/30">
              <BookOpen size={20} strokeWidth={2} />
            </div>

            <div>
              <h2 className="text-2xl font-bold text-yellow-300">
                Add Study Room
              </h2>
              <p className="text-[11px] uppercase tracking-widest text-white/40 mt-0.5">
                Study Room Management Portal
              </p>
            </div>
          </div>

          <form onSubmit={onSubmit} className="p-6 sm:p-10 space-y-8 max-w-3xl">

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

              <div>
                <Label className="flex items-center gap-1.5 text-yellow-400 text-xs uppercase tracking-widest font-bold mb-1">
                  <DoorOpen size={12} /> Room Name
                </Label>
                <Input
                  name="roomName"
                  placeholder="Silent Study Room A"
                  className="bg-white/5 border border-yellow-600/30 text-white rounded-xl mt-1 w-full placeholder:text-white/20 focus:border-yellow-400"
                />
              </div>

              <div>
                <Label className="flex items-center gap-1.5 text-yellow-400 text-xs uppercase tracking-widest font-bold mb-1">
                  <Layers size={12} /> Floor
                </Label>
                <Input
                  name="floor"
                  placeholder="3rd Floor"
                  className="bg-white/5 border border-yellow-600/30 text-white rounded-xl mt-1 w-full placeholder:text-white/20 focus:border-yellow-400"
                />
              </div>

            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

              <div>
                <Label className="flex items-center gap-1.5 text-yellow-400 text-xs uppercase tracking-widest font-bold mb-1">
                  <Users size={12} /> Capacity
                </Label>
                <Input
                  name="capacity"
                  type="number"
                  placeholder="4 people"
                  className="bg-white/5 border border-yellow-600/30 text-white rounded-xl mt-1 w-full placeholder:text-white/20 focus:border-yellow-400"
                />
              </div>

              <div>
                <Label className="flex items-center gap-1.5 text-yellow-400 text-xs uppercase tracking-widest font-bold mb-1">
                  <DollarSign size={12} /> Hourly Rate
                </Label>
                <Input
                  name="hourlyRate"
                  type="number"
                  placeholder="5"
                  className="bg-white/5 border border-yellow-600/30 text-white rounded-xl mt-1 w-full placeholder:text-white/20 focus:border-yellow-400"
                />
              </div>

            </div>

            <div>
              <Label className="flex items-center gap-1.5 text-yellow-400 text-xs uppercase tracking-widest font-bold mb-1">
                <ImageIcon size={12} /> Image URL
              </Label>
              <Input
                name="image"
                placeholder="https://example.com/room.jpg"
                className="bg-white/5 border border-yellow-600/30 text-white rounded-xl mt-1 w-full placeholder:text-white/20 focus:border-yellow-400"
              />
            </div>

            <div>
              <Label className="flex items-center gap-1.5 text-yellow-400 text-xs uppercase tracking-widest font-bold mb-1">
                <FileText size={12} /> Description
              </Label>
              <textarea
                name="description"
                placeholder="Describe the study room..."
                className="bg-white/5 border border-yellow-600/30 text-white rounded-xl mt-1 w-full placeholder:text-white/20 focus:border-yellow-400 focus:outline-none p-3 min-h-[96px] resize-y text-sm"
              />
            </div>

            <div>
              <Label className="text-yellow-400 text-xs uppercase tracking-widest font-bold">
                Amenities
              </Label>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-3 text-sm">
                {Object.keys(amenityIcons).map((item) => {
                  const Icon = amenityIcons[item];
                  return (
                    <label
                      key={item}
                      className="flex items-center gap-2 bg-white/5 border border-yellow-600/30 px-3 py-2.5 rounded-xl cursor-pointer hover:bg-yellow-400/10 hover:border-yellow-400 transition-all duration-150 text-white/80"
                    >
                      <input
                        type="checkbox"
                        name="amenities"
                        value={item}
                        className="accent-yellow-400 w-3.5 h-3.5 shrink-0"
                      />
                      <Icon size={14} strokeWidth={2} className="text-yellow-400 shrink-0" />
                      {item}
                    </label>
                  );
                })}
              </div>
            </div>

            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-yellow-400 to-yellow-600 text-[#0a0f1e] font-bold py-3 rounded-xl hover:opacity-90 transition flex items-center justify-center gap-2 shadow-lg shadow-yellow-500/30"
            >
              <Plus size={18} strokeWidth={2.5} />
              Add Room
            </Button>

          </form>
        </Card>
      </div>
    </div>
  );
}