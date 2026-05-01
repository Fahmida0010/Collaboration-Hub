"use client";

import { useState } from "react";
 import { postData } from "@/lib/api";
import { FaGoogle } from "react-icons/fa";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    const data = await postData("/auth/login", {
      email,
      password,
    });

    console.log("Login:", data);
  };

  const handleGoogleLogin = async () => {
    // demo only (real OAuth later)
    const data = await postData("/auth/google", {
      email: "googleuser@gmail.com",
      name: "Google User",
    });

    console.log("Google Login:", data);
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="w-96 bg-white p-6 rounded shadow">

        <h1 className="text-2xl font-bold mb-4">Login</h1>

        <input
          className="border w-full p-2 mb-3"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          className="border w-full p-2 mb-3"
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={handleLogin}
          className="bg-blue-500 text-white w-full p-2"
        >
          Login
        </button>

        <div className="my-3 text-center text-gray-400">OR</div>

        <button
          onClick={handleGoogleLogin}
          className="bg-red-500 text-white w-full p-2"
        >
            <FaGoogle/>
          Continue with Google
        </button>
          <p className="text-center text-sm mt-4">
       Don't have an account?{" "}
          <a href="/login" className="text-blue-500 font-medium">
            Register
          </a>
        </p>
      </div>
    </div>
  );
}