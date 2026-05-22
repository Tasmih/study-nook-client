"use client";

import { authClient } from "@/lib/auth-client";
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

    try {
      const { data: tokenData } = await authClient.token();

      const form = e.target;
      const formData = new FormData(form);

      const room = {
        roomName: formData.get("roomName"),
        floor: formData.get("floor"),
        capacity: formData.get("capacity"),
        hourlyRate: formData.get("hourlyRate"),
        image: formData.get("image"),
        description: formData.get("description"),
        amenities: formData.getAll("amenities"),
      };

      const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/room`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
          authorization: `Bearer ${tokenData.token}`,
        },
        body: JSON.stringify(room),
      });

      const data = await res.json();
      console.log(data);
    } catch (err) {
      console.error(err?.message || err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#070b18] via-[#0f172a] to-black flex justify-center items-start px-4 py-10">
      <div className="w-full max-w-4xl">

        <div className="text-center mb-8">
          <h1 className="text-4xl sm:text-5xl font-semibold text-[#f5ecd7]">
            Add Study <span className="text-[#d8c08c] italic">Room</span>
          </h1>
          <p className="text-white/40 mt-2 text-sm">
            fill in the details to list a new study space
          </p>
        </div>

        <Card className="w-full bg-[rgba(10,20,45,0.92)] border border-yellow-500/20 rounded-2xl backdrop-blur-xl shadow-[0_10px_48px_rgba(0,0,0,0.6)]">
          <div className="p-5 border-b border-yellow-500/20 flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-yellow-400 to-yellow-600 text-[#0a0f1e] shadow-lg shadow-yellow-500/20">
              <BookOpen size={18} strokeWidth={2} />
            </div>
            <div>
              <h2 className="text-base font-bold text-[#f5ecd7]">Room Details</h2>
              <p className="text-[10px] uppercase tracking-widest text-white/40 mt-0.5">
                Study Room Management Portal
              </p>
            </div>
          </div>

          <form onSubmit={onSubmit} className="p-6 sm:p-10 space-y-8 max-w-3xl">

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <Label className="flex items-center gap-1.5 text-[9px] font-bold text-[#f5ecd7]/70 uppercase tracking-wider mb-1.5">
                  <DoorOpen size={11} /> Room Name
                </Label>
                <Input
                  name="roomName"
                  placeholder="Silent Study Room A"
                  className="bg-white/5 border border-yellow-500/20 text-white rounded-xl w-full placeholder:text-white/20 focus:border-yellow-400"
                />
              </div>

              <div>
                <Label className="flex items-center gap-1.5 text-[9px] font-bold text-[#f5ecd7]/70 uppercase tracking-wider mb-1.5">
                  <Layers size={11} /> Floor
                </Label>
                <Input
                  name="floor"
                  placeholder="3rd Floor"
                  className="bg-white/5 border border-yellow-500/20 text-white rounded-xl w-full placeholder:text-white/20 focus:border-yellow-400"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <Label className="flex items-center gap-1.5 text-[9px] font-bold text-[#f5ecd7]/70 uppercase tracking-wider mb-1.5">
                  <Users size={11} /> Capacity
                </Label>
                <Input
                  name="capacity"
                  type="number"
                  placeholder="4 people"
                  className="bg-white/5 border border-yellow-500/20 text-white rounded-xl w-full placeholder:text-white/20 focus:border-yellow-400"
                />
              </div>

              <div>
                <Label className="flex items-center gap-1.5 text-[9px] font-bold text-[#f5ecd7]/70 uppercase tracking-wider mb-1.5">
                  <DollarSign size={11} /> Hourly Rate
                </Label>
                <Input
                  name="hourlyRate"
                  type="number"
                  placeholder="5"
                  className="bg-white/5 border border-yellow-500/20 text-white rounded-xl w-full placeholder:text-white/20 focus:border-yellow-400"
                />
              </div>
            </div>

            <div>
              <Label className="flex items-center gap-1.5 text-[9px] font-bold text-[#f5ecd7]/70 uppercase tracking-wider mb-1.5">
                <ImageIcon size={11} /> Image URL
              </Label>
              <Input
                name="image"
                placeholder="https://example.com/room.jpg"
                className="bg-white/5 border border-yellow-500/20 text-white rounded-xl w-full placeholder:text-white/20 focus:border-yellow-400"
              />
            </div>

            <div>
              <Label className="flex items-center gap-1.5 text-[9px] font-bold text-[#f5ecd7]/70 uppercase tracking-wider mb-1.5">
                <FileText size={11} /> Description
              </Label>
              <textarea
                name="description"
                placeholder="Describe the study room..."
                className="bg-white/5 border border-yellow-500/20 text-white rounded-xl w-full placeholder:text-white/20 focus:border-yellow-400 focus:outline-none p-3 min-h-[96px] resize-y text-sm"
              />
            </div>

            <div>
              <Label className="text-[9px] font-bold text-[#f5ecd7]/70 uppercase tracking-wider">
                Amenities
              </Label>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-3 text-sm">
                {Object.keys(amenityIcons).map((item) => {
                  const Icon = amenityIcons[item];
                  return (
                    <label
                      key={item}
                      className="flex items-center gap-2 bg-white/5 border border-yellow-500/20 px-3 py-2.5 rounded-xl cursor-pointer hover:bg-yellow-400/10 hover:border-yellow-400 transition-all duration-150 text-white/60 hover:text-[#d8c08c] text-[11px]"
                    >
                      <input
                        type="checkbox"
                        name="amenities"
                        value={item}
                        className="accent-[#d8c08c] w-3 h-3 shrink-0"
                      />
                      <Icon size={13} strokeWidth={2} className="text-[#d8c08c] shrink-0" />
                      {item}
                    </label>
                  );
                })}
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-[#d8c08c] text-[#0f172a] py-2 rounded-xl text-[11px] font-semibold hover:bg-[#e7d2a3] hover:scale-[1.02] active:scale-95 transition-all duration-200 flex items-center justify-center gap-2"
            >
              <Plus size={14} strokeWidth={2.5} />
              Add Room
            </button>

          </form>
        </Card>
      </div>
    </div>
  );
}