"use client";

import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Sun, Moon } from "lucide-react";
import { useState } from "react";
import { useTheme } from "next-themes";
import { navLinks } from "../../../frontend/components/navbar/navLink";

export default function Navbar() {
  const { data: session } = useSession();
  const user = session?.user;

  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const { theme, setTheme } = useTheme();

  return (
    <nav className="bg-white dark:bg-gray-900 shadow px-6 py-3">

      <div className="flex items-center justify-between">

        {/* Logo */}
        <h1 className="font-bold text-lg">Collab Hub</h1>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-6">

          {navLinks.map((item, i) => {
            if (item.protected && !user) return null;

            const isActive = pathname === item.path;

            return (
              <Link key={i} href={item.path}>
                <div
                  className={`flex items-center gap-1 cursor-pointer
                  ${
                    isActive
                      ? "text-blue-500 font-semibold"
                      : "text-gray-700 dark:text-gray-200"
                  }`}
                >
                  <item.icon size={16} />
                  {item.name}
                </div>
              </Link>
            );
          })}

        </div>

        {/* Right side */}
        <div className="flex items-center gap-3">

          {/* Theme */}
          <button
            onClick={() =>
              setTheme(theme === "light" ? "dark" : "light")
            }
            className="border p-2 rounded"
          >
            {theme === "light" ? <Moon size={16} /> : <Sun size={16} />}
          </button>

          {/* Desktop User */}
          <div className="hidden md:flex items-center gap-3">
            {user ? (
              <>
                <Link href="/profile">
                  {user.image ? (
                    <img
                      src={user.image}
                      className="w-8 h-8 rounded-full cursor-pointer"
                    />
                  ) : (
                    <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center">
                      {user.name?.charAt(0)}
                    </div>
                  )}
                </Link>

                <button
                  onClick={() => signOut()}
                  className="bg-red-500 text-white px-3 py-1 rounded text-sm"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link href="/login">
                <button className="bg-blue-500 text-white px-3 py-1 rounded">
                  Login
                </button>
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            {open ? (
              <X onClick={() => setOpen(false)} />
            ) : (
              <Menu onClick={() => setOpen(true)} />
            )}
          </div>

        </div>
      </div>

      {/* 📱 Mobile Menu */}
      {open && (
        <div className="md:hidden mt-4 flex flex-col gap-3">

          {navLinks.map((item, i) => {
            if (item.protected && !user) return null;

            return (
              <Link key={i} href={item.path}>
                <div className="flex items-center gap-2 p-2 border rounded">
                  <item.icon size={16} />
                  {item.name}
                </div>
              </Link>
            );
          })}

          {/* Mobile User */}
          {user ? (
            <>
              <Link href="/profile">
                <div className="p-2 border rounded text-center">
                  Profile
                </div>
              </Link>

              <button
                onClick={() => signOut()}
                className="bg-red-500 text-white p-2 rounded"
              >
                Logout
              </button>
            </>
          ) : (
            <Link href="/login">
              <button className="bg-blue-500 text-white p-2 rounded">
                Login
              </button>
            </Link>
          )}
        </div>
      )}

    </nav>
  );
}