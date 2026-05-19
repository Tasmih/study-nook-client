"use client";

import Link from "next/link";
import { Card } from "@heroui/react";
import { User, ImageIcon, Mail, Lock, UserPlus } from "lucide-react";
import { FcGoogle } from "react-icons/fc";

export default function RegisterPage() {
  const handleRegister = (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const user = {
      name: formData.get("name"),
      image: formData.get("image"),
      email: formData.get("email"),
      password: formData.get("password"),
    };

    console.log(user);
  };

  const inputCls =
    "w-full rounded-xl bg-white/5 border border-yellow-600/30 px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-yellow-400/40 focus:border-yellow-400 transition duration-200";

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-10 bg-gradient-to-br from-[#0a0f1e] via-[#0f172a] to-black">

      <div className="w-full flex justify-center">

        <Card className="w-full max-w-lg rounded-3xl bg-[rgba(13,27,53,0.88)] backdrop-blur-xl border border-yellow-600/30 shadow-[0_10px_48px_rgba(0,0,0,0.6)] p-8">

          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-yellow-300">
              Create Account
            </h1>
            <p className="text-white/40 mt-2 text-sm">
              Join Study Nook and start booking rooms
            </p>
          </div>

          <form onSubmit={handleRegister} className="space-y-4">

            <div className="relative">
              <User size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-yellow-400/70 pointer-events-none" />
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                required
                className={`${inputCls} pl-10`}
              />
            </div>

            <div className="relative">
              <ImageIcon size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-yellow-400/70 pointer-events-none" />
              <input
                type="url"
                name="image"
                placeholder="Profile Image URL"
                className={`${inputCls} pl-10`}
              />
            </div>

            <div className="relative">
              <Mail size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-yellow-400/70 pointer-events-none" />
              <input
                type="email"
                name="email"
                placeholder="Email"
                required
                className={`${inputCls} pl-10`}
              />
            </div>

            <div className="relative">
              <Lock size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-yellow-400/70 pointer-events-none" />
              <input
                type="password"
                name="password"
                placeholder="Password"
                required
                className={`${inputCls} pl-10`}
              />
            </div>

            <button
              type="submit"
              className="w-full rounded-xl bg-gradient-to-r from-yellow-400 to-yellow-600 hover:opacity-90 py-3 text-[#0a0f1e] font-bold transition duration-300 flex items-center justify-center gap-2 shadow-lg shadow-yellow-500/30 mt-2"
            >
              <UserPlus size={17} strokeWidth={2.5} />
              Register
            </button>

          </form>

          <div className="flex items-center gap-3 my-6">
            <div className="h-px flex-1 bg-yellow-600/30" />
            <span className="text-white/40 text-sm">OR</span>
            <div className="h-px flex-1 bg-yellow-600/30" />
          </div>

          <button className="w-full rounded-xl border border-yellow-600/30 bg-white/5 py-3 text-white hover:bg-yellow-400/10 hover:border-yellow-400 transition duration-200 flex items-center justify-center gap-3">
            <FcGoogle size={20} />
            Sign up with Google
          </button>

          <p className="text-center text-sm text-white/40 mt-6">
            Already have an account?{" "}
            <Link href="/login" className="text-yellow-400 hover:text-yellow-300 font-semibold">
              Login
            </Link>
          </p>

        </Card>

      </div>
    </div>
  );
}