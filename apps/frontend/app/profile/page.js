"use client";

import { useEffect, useState } from "react";

export default function ProfilePage() {
  const [user, setUser] = useState(null);
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/me`, {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => setUser(data.user));
  }, []);

  const uploadAvatar = async () => {
    if (!file) return;

    setLoading(true);

    const formData = new FormData();
    formData.append("avatar", file);

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/user/avatar`,
        {
          method: "PUT",
          body: formData,
          credentials: "include",
        }
      );

      const data = await res.json();

      if (data?.user) {
        setUser(data.user); // DB updated instantly reflect
      }

      setFile(null);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-900 text-gray-600 dark:text-gray-300">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors p-4 md:p-6 flex justify-center">
      
      <div className="w-full max-w-4xl space-y-6">

        {/* PROFILE CARD */}
        <div className="bg-white dark:bg-gray-800 p-5 md:p-6 rounded-2xl shadow flex flex-col md:flex-row items-center md:items-start gap-5">

          {/* AVATAR */}
          <div className="w-24 h-24 rounded-full overflow-hidden bg-blue-500 flex items-center justify-center text-white text-2xl font-bold">
            
            {user.avatar || user.image ? (
              <img
                src={user.avatar || user.image}
                className="w-full h-full object-cover"
                alt="profile"
              />
            ) : (
              user.name?.charAt(0).toUpperCase()
            )}

          </div>

          {/* INFO */}
          <div className="text-center md:text-left w-full">

            {/* 👇 NAME ALWAYS SHOW FIXED */}
            <h1 className="text-xl font-bold text-gray-800 dark:text-white">
              {user.name || "No Name Found"}
            </h1>

            <p className="text-gray-500 dark:text-gray-300">
              {user.email}
            </p>

            {/* UPLOAD */}
            <div className="mt-4 flex flex-col sm:flex-row gap-2 items-center">

              <input
                type="file"
                onChange={(e) => setFile(e.target.files[0])}
                className="text-sm text-gray-500 dark:text-gray-300"
              />

              <button
                onClick={uploadAvatar}
                disabled={loading}
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded w-full sm:w-auto"
              >
                {loading ? "Uploading..." : "Update Photo"}
              </button>

            </div>

          </div>
        </div>

        {/* SETTINGS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* PASSWORD */}
          <div className="bg-white dark:bg-gray-800 p-5 rounded-2xl shadow">
            <h2 className="text-lg font-bold mb-4 text-gray-800 dark:text-white">
              Change Password
            </h2>

            <input
              placeholder="Old Password"
              className="w-full border dark:border-gray-700 bg-transparent p-2 mb-2 rounded text-gray-800 dark:text-white"
            />

            <input
              placeholder="New Password"
              className="w-full border dark:border-gray-700 bg-transparent p-2 mb-2 rounded text-gray-800 dark:text-white"
            />

            <button className="bg-green-500 text-white px-4 py-2 rounded w-full">
              Update Password
            </button>
          </div>

          {/* ACCOUNT INFO */}
          <div className="bg-white dark:bg-gray-800 p-5 rounded-2xl shadow">
            <h2 className="text-lg font-bold mb-4 text-gray-800 dark:text-white">
              Account Info
            </h2>

            <p className="text-gray-600 dark:text-gray-300">
              Name: {user.name}
            </p>

            <p className="text-gray-600 dark:text-gray-300">
              Email: {user.email}
            </p>

            <button className="mt-4 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded w-full">
              Delete Account
            </button>

          </div>

        </div>
      </div>
    </div>
  );
}