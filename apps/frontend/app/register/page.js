"use client";

import { useState } from "react";
import { postData } from "@/lib/api";
import { FaGoogle } from "react-icons/fa";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [avatar, setAvatar] = useState(null);

  // Register submit
  const handleRegister = async () => {
    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("password", password);
    if (avatar) formData.append("avatar", avatar);

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/auth/register`,
      {
        method: "POST",
        body: formData,
        credentials: "include",
      }
    );

    const data = await res.json();
    console.log("Register:", data);
  };

  // Google login (demo / later OAuth)
  const handleGoogle = async () => {
    const res = await postData("/auth/google", {
      email: "googleuser@gmail.com",
      name: "Google User",
    });

    console.log("Google Login:", res);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-50 to-green-50">

      <div className="w-96 bg-white p-6 rounded-2xl shadow-lg">

        {/* Title */}
        <h1 className="text-2xl font-bold text-center mb-6">
          Create Account
        </h1>

        {/* Profile Upload */}
        <div className="flex flex-col items-center mb-4">
          <label className="cursor-pointer">
            <input
              type="file"
              hidden
              onChange={(e) => setAvatar(e.target.files[0])}
            />
            <div className="w-20 h-20 rounded-full bg-gray-200 flex items-center justify-center text-sm text-gray-600 overflow-hidden">
              {avatar ? (
                <img
                  src={URL.createObjectURL(avatar)}
                  className="w-full h-full object-cover"
                />
              ) : (
                "Upload"
              )}
            </div>
          </label>
        </div>

        {/* Inputs */}
        <input
          className="border w-full p-2 mb-3 rounded"
          placeholder="Name"
          onChange={(e) => setName(e.target.value)}
        />

        <input
          className="border w-full p-2 mb-3 rounded"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />

        {/* Password with show/hide */}
        <div className="relative mb-3">
          <input
            className="border w-full p-2 rounded"
            type={showPass ? "text" : "password"}
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />

          <span
            onClick={() => setShowPass(!showPass)}
            className="absolute right-3 top-2 text-sm text-blue-500 cursor-pointer"
          >
            {showPass ? "Hide" : "Show"}
          </span>
        </div>

        {/* Register Button */}
        <button
          onClick={handleRegister}
          className="bg-green-500 hover:bg-green-600 text-white w-full p-2 rounded"
        >
          Register
        </button>

        {/* OR */}
        <div className="text-center my-3 text-gray-400">OR</div>

        {/* Google Login */}
        <button
          onClick={handleGoogle}
          className="flex items-center justify-center gap-2 bg-red-500 hover:bg-red-600 text-white w-full p-2 rounded"
        >
          <FaGoogle />
          Continue with Google
        </button>

        {/* Login link */}
        <p className="text-center text-sm mt-4">
          Already have an account?{" "}
          <a href="/login" className="text-blue-500 font-medium">
            Login
          </a>
        </p>

      </div>
    </div>
  );
}