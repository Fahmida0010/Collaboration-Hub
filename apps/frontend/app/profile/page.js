"use client";

import { useEffect, useState } from "react";

export default function ProfilePage() {
  const [user, setUser] = useState(null);
  const [file, setFile] = useState(null);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/me`, {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => setUser(data.user));
  }, []);

  const uploadAvatar = async () => {
    const formData = new FormData();
    formData.append("avatar", file);

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/user/avatar`,
      {
        method: "PUT",
        body: formData,
        credentials: "include",
      }
    );

    const data = await res.json();
    setUser(data.user);
  };

  if (!user) {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-6 flex justify-center">

      <div className="w-full max-w-4xl space-y-6">

        {/* PROFILE CARD */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow flex items-center gap-6">

          <div className="w-24 h-24 rounded-full bg-blue-500 overflow-hidden flex items-center justify-center text-white text-2xl font-bold">
            {user.avatar ? (
              <img src={user.avatar} className="w-full h-full object-cover" />
            ) : (
              user.name?.charAt(0)
            )}
          </div>

          <div>
            <h1 className="text-xl font-bold">{user.name}</h1>
            <p className="text-gray-500">{user.email}</p>

            <div className="mt-3 flex gap-2">
              <input
                type="file"
                onChange={(e) => setFile(e.target.files[0])}
              />

              <button
                onClick={uploadAvatar}
                className="bg-blue-500 text-white px-3 py-1 rounded"
              >
                Update Photo
              </button>
            </div>
          </div>
        </div>

        {/* SETTINGS SECTION */}
        <div className="grid md:grid-cols-2 gap-6">

          {/* PASSWORD CHANGE UI */}
          <div className="bg-white dark:bg-gray-800 p-5 rounded-2xl shadow">

            <h2 className="text-lg font-bold mb-4">Change Password</h2>

            <input
              placeholder="Old Password"
              className="w-full border p-2 mb-2 rounded"
            />

            <input
              placeholder="New Password"
              className="w-full border p-2 mb-2 rounded"
            />

            <button className="bg-green-500 text-white px-4 py-2 rounded w-full">
              Update Password
            </button>
          </div>

          {/* ACCOUNT INFO */}
          <div className="bg-white dark:bg-gray-800 p-5 rounded-2xl shadow">

            <h2 className="text-lg font-bold mb-4">Account Info</h2>

            <p className="text-gray-500">Name: {user.name}</p>
            <p className="text-gray-500">Email: {user.email}</p>

            <button className="mt-4 bg-red-500 text-white px-4 py-2 rounded w-full">
              Delete Account
            </button>

          </div>

        </div>

      </div>
    </div>
  );
}