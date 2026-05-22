"use client";

import { authClient } from "@/lib/auth-client";
import {
  Button,
  Card,
  Description,
  FieldError,
  Form,
  Input,
  Label,
  Separator,
  TextField,
} from "@heroui/react";

import Link from "next/link";
import React from "react";
import { toast } from "react-toastify";
import { FcGoogle } from "react-icons/fc";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";

const RegisterPage = () => {
 const onSubmit = async (e) => {
  e.preventDefault();

  const formData = new FormData(e.currentTarget);
  const user = Object.fromEntries(formData.entries());

  const { data, error } = await authClient.signUp.email({
    email: user.email,
    password: user.password,
    name: user.name,
    image: user.image,
  });

  console.log(data, error);

  if (data) {
    toast.success("Account created successfully", {
      icon: <FaCheckCircle />,
    });

    window.location.href = "/";
  }

  if (error) {
    toast.error(error?.message || "Registration failed", {
      icon: <FaTimesCircle/>,
    });
  }
};
  const handleGoogleSignin = async () => {
    await authClient.signIn.social({
      provider: "google",
    });
  };

  return (
       <div className="min-h-screen flex items-center justify-center px-4 py-10 bg-gradient-to-br from-[#070b18] via-[#0f172a] to-black">

      <Card className="w-full max-w-md rounded-3xl bg-[rgba(10,20,45,0.92)] backdrop-blur-xl border border-yellow-500/20 shadow-[0_10px_48px_rgba(0,0,0,0.6)] p-6 sm:p-8">

        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-yellow-300">
            Create Account
          </h1>

          <p className="text-white/40 mt-2 text-sm">
            Join Study Nook and start booking rooms
          </p>
        </div>

        <Form
          onSubmit={onSubmit}
          className="flex flex-col gap-5 w-full"
        >
          <TextField name="name" type="text">
            <Label className="text-white/70">
              Name
            </Label>

            <Input
              placeholder="Enter your name"
              className="w-full rounded-xl bg-white/5 border border-yellow-500/20 px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-yellow-400/40 focus:border-yellow-400 transition duration-300"
            />

            <FieldError />
          </TextField>

          <TextField name="image" type="text">
            <Label className="text-white/70">
              Image URL
            </Label>

            <Input
              placeholder="Enter image url"
              className="w-full rounded-xl bg-white/5 border border-yellow-500/20 px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-yellow-400/40 focus:border-yellow-400 transition duration-300"
            />

            <FieldError />
          </TextField>

          <TextField
            isRequired
            name="email"
            type="email"
            validate={(value) => {
              if (
                !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)
              ) {
                return "Please enter a valid email address";
              }

              return null;
            }}
          >
            <Label className="text-white/70">
              Email
            </Label>

            <Input
              placeholder="john@example.com"
              className="w-full rounded-xl bg-white/5 border border-yellow-500/20 px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-yellow-400/40 focus:border-yellow-400 transition duration-300"
            />

            <FieldError />
          </TextField>

          <TextField
            isRequired
            minLength={8}
            name="password"
            type="password"
            validate={(value) => {
              if (value.length < 6) {
                return "Password must be at least 8 characters";
              }

              if (!/[A-Z]/.test(value)) {
                return "Password must contain at least one uppercase letter";
              }

              if (!/[0-9]/.test(value)) {
                return "Password must contain at least one number";
              }

              return null;
            }}
          >
            <Label className="text-white/70">
              Password
            </Label>

            <Input
              placeholder="Enter your password"
              className="w-full rounded-xl bg-white/5 border border-yellow-500/20 px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-yellow-400/40 focus:border-yellow-400 transition duration-300"
            />

            <Description className="text-xs text-white/40">
              Must be at least 6 characters with 1 uppercase and 1 number
            </Description>

            <FieldError />
          </TextField>

          <Button
            className="w-full h-12 rounded-xl bg-gradient-to-r from-yellow-400 to-yellow-600 text-[#0a0f1e] font-bold hover:scale-[1.02] transition-all duration-300"
            type="submit"
          >
            Create Account
          </Button>
        </Form>

        <div className="flex justify-center items-center gap-3 my-6">
          <Separator className="flex-1 bg-yellow-500/20" />

          <div className="whitespace-nowrap text-sm text-white/40">
            Or sign up with
          </div>

          <Separator className="flex-1 bg-yellow-500/20" />
        </div>

        <Button
          onClick={handleGoogleSignin}
          className="w-full h-12 rounded-xl border border-yellow-500/20 bg-white/5 text-white hover:bg-yellow-400/10 transition-all duration-300"
        >
          <FcGoogle size={22} />
          Sign in with Google
        </Button>

        <p className="text-center text-sm text-white/40 mt-6">
          Already have an account?{" "}
          <Link
            href="/login"
            className="text-yellow-400 hover:text-yellow-300 font-semibold"
          >
            Login
          </Link>
        </p>

      </Card>
    </div>
  );
};


export default RegisterPage;