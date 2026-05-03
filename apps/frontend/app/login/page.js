"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { useAuthStore } from "@/store/useAuthStore";




export default function LoginPage() {
  const router = useRouter();
  const { fetchUser } = useAuthStore();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            password,
          }),
          credentials: "include",
        }
      );

      const data = await res.json();

      console.log("Login response:", data);

      if (data.success) {
         await fetchUser(); 
        router.push("/dashboard");
      } else {
        alert(data.error || "Login failed");
      }
    } catch (err) {
      console.log("Login error:", err);
    }
  };

  const handleGoogleLogin = async () => {
    await signIn("google", {
      callbackUrl: "/dashboard",
    });
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100 dark:bg-gray-900 transition-colors">
      <div className="w-96 bg-white dark:bg-gray-800 text-black dark:text-white p-6 rounded shadow transition-colors">

        <h1 className="text-3xl font-bold mb-4 p-4">
          Login to{" "}
          <span className="text-pink-400">Collaboration Hub</span>
        </h1>

        {/* Email */}
        <input
          className="border w-full p-2 mb-3 rounded bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          placeholder="Email"
          type="email"
          onChange={(e) => setEmail(e.target.value)}
        />

        {/* Password */}
        <div className="relative mb-3">
          <input
            className="border w-full p-2 pr-10 rounded bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            placeholder="Password"
            type={showPassword ? "text" : "password"}
            onChange={(e) => setPassword(e.target.value)}
          />

          <span
            className="absolute right-3 top-2.5 cursor-pointer text-gray-600 dark:text-gray-300"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? (
              <AiFillEyeInvisible size={20} />
            ) : (
              <AiFillEye size={20} />
            )}
          </span>
        </div>

        {/* Login button */}
        <button
          onClick={handleLogin}
          className="bg-blue-500 hover:bg-blue-600 text-white w-full p-2 rounded transition"
        >
          Login
        </button>

        <div className="my-3 text-center text-gray-400">OR</div>

        {/* Google login */}
        <button
          onClick={handleGoogleLogin}
          className="border dark:border-gray-600 flex items-center justify-center gap-2 w-full p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700 transition"
        >
          <FcGoogle size={22} />
          Continue with Google
        </button>

        <p className="text-center text-sm mt-4">
          Don't have an account?{" "}
          <a href="/register" className="text-blue-500 font-medium">
            Register
          </a>
        </p>
      </div>
    </div>
  );
}