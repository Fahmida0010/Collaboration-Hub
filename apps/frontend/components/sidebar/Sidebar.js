"use client";

import SidebarItem from "./SidebarItem";
import { sidebarLinks } from "./sidebarData";

export default function Sidebar() {
  return (
    <div className="w-64 h-screen bg-white shadow-lg p-4 flex flex-col">

      {/* Logo */}
      <h1 className="text-xl font-bold mb-6">
        Team Hub
      </h1>

      {/* Menu */}
      <div className="flex flex-col gap-2">
        {sidebarLinks.map((item, index) => (
          <SidebarItem key={index} item={item} />
        ))}
      </div>

      {/* Bottom user section */}
      <div className="mt-auto pt-6 border-t">
        <p className="text-sm text-gray-500">
          Logged in user
        </p>

        <button className="mt-2 w-full bg-red-500 text-white p-2 rounded">
          Logout
        </button>
      </div>

    </div>
  );
}