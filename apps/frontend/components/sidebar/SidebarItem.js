"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function SidebarItem({ item }) {
  const pathname = usePathname();

  const isActive = pathname === item.path;

  return (
    <Link href={item.path}>
      <div
        className={`p-3 rounded cursor-pointer transition 
        ${
          isActive
            ? "bg-blue-500 text-white"
            : "hover:bg-gray-200 text-gray-700"
        }`}
      >
        {item.name}
      </div>
    </Link>
  );
}