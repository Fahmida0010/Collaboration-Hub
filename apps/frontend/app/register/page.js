"use client";

import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { signIn } from "next-auth/react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/useAuthStore";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [avatar, setAvatar] = useState(null);
  const router = useRouter();
  const { fetchUser } = useAuthStore();


  const handleRegister = async () => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/auth/register`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
          avatar,
        }),
        credentials: "include",
      }
    );

    const data = await res.json();

    if (data.success) {
       await fetchUser(); 
      router.push("/dashboard");
    } else {
      alert(data.error);
    }
  };

  const handleGoogle = () => {
    signIn("google", { callbackUrl: "/dashboard" });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-50 to-green-50 dark:from-gray-900 dark:to-gray-800 transition-colors">

      <div className="w-96 bg-white dark:bg-gray-800 text-black dark:text-white p-6 rounded-2xl shadow-lg transition-colors">

        {/* Title */}
        <h1 className="text-2xl font-bold text-center mb-6">
          Welcome to{" "}
          <span className="text-pink-400">Collaboration Hub</span>
          <br />
          Create An Account
        </h1>

        {/* Profile Upload */}
        <div className="flex flex-col items-center mb-4">
          <label className="cursor-pointer">
            <input
              type="file"
              hidden
              onChange={(e) => setAvatar(e.target.files[0])}
            />
            <div className="w-20 h-20 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-xs text-gray-600 dark:text-gray-300 overflow-hidden text-center">
              {avatar ? (
                <img
                  src={URL.createObjectURL(avatar)}
                  className="w-full h-full object-cover"
                  alt="avatar"
                />
              ) : (
                <div className="flex flex-col items-center justify-center">
                  <span>Upload</span>
                  <span>Photo</span>
                </div>
              )}
            </div>
          </label>
        </div>

        {/* Inputs */}
        <input
          className="border w-full p-2 mb-3 rounded bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          placeholder="Name"
          onChange={(e) => setName(e.target.value)}
        />

        <input
          className="border w-full p-2 mb-3 rounded bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />

        {/* Password */}
        <div className="relative mb-3">
          <input
            className="border w-full p-2 rounded bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            type={showPass ? "text" : "password"}
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />

          <span
            onClick={() => setShowPass(!showPass)}
            className="absolute right-3 top-2 text-sm text-blue-500 dark:text-blue-300 cursor-pointer"
          >
            {showPass ? <FaEyeSlash /> : <FaEye />}
          </span>
        </div>

        {/* Register Button */}
        <button
          onClick={handleRegister}
          className="bg-green-500 hover:bg-green-600 text-white w-full p-2 rounded transition"
        >
          Register
        </button>

        {/* OR */}
        <div className="text-center my-3 text-gray-400 dark:text-gray-500">OR</div>

        {/* Google Login */}
        <button
          onClick={handleGoogle}
          className="flex items-center justify-center gap-2 bg-gray-100 dark:bg-gray-700 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-600 w-full p-2 rounded transition"
        >
          <FcGoogle />
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