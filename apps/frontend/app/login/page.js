"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { postData } from "@/lib/api";
import { FcGoogle } from "react-icons/fc";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // Email/Password login
  const handleLogin = async () => {
    try {
      const data = await postData("/auth/login", {
        email,
        password,
      });

      console.log("Login success:", data);

      // redirect to dashboard
      router.push("/dashboard");
    } catch (err) {
      console.log("Login error:", err);
    }
  };

  // Google OAuth login
  const handleGoogleLogin = async () => {
    await signIn("google", {
      callbackUrl: "/dashboard", 
    });
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="w-96 bg-white p-6 rounded shadow">

        <h1 className="text-3xl font-bold mb-4 p-4">Login to
          <span className="text-pink-400"> Collaboration Hub</span></h1>

        {/* Email */}
        <input
          className="border w-full p-2 mb-3"
          placeholder="Email"
          type="email"
          onChange={(e) => setEmail(e.target.value)}
        />

        {/* Password */}
        <div className="relative mb-3">
          <input
            className="border w-full p-2 pr-10"
            placeholder="Password"
            type={showPassword ? "text" : "password"}
            onChange={(e) => setPassword(e.target.value)}
          />

          <span
            className="absolute right-3 top-2.5 cursor-pointer"
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
          className="bg-blue-500 text-white w-full p-2 rounded"
        >
          Login 
        </button>

        <div className="my-3 text-center text-gray-400">OR</div>

        {/* Google login */}
        <button
          onClick={handleGoogleLogin}
          className="border flex items-center justify-center gap-2 w-full p-2 rounded"
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