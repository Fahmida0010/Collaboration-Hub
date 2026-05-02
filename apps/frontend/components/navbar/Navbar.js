"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  FolderKanban,
  Target,
  Megaphone,
  CheckSquare,
  User,
  LogOut,
  Menu,
  X,
  Moon,
  Sun,
} from "lucide-react";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";

export default function Navbar() {
  const pathname = usePathname();

  const [user, setUser] = useState(null);
  const [open, setOpen] = useState(false);

  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  //  JWT user load
  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/me`, {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => setUser(data.user || null))
      .catch(() => setUser(null));
  }, []);

  const handleLogout = async () => {
    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/logout`, {
      method: "POST",
      credentials: "include",
    });
    setUser(null);
  };

  const navLinks = [
    { name: "Dashboard", path: "/dashboard", icon: LayoutDashboard, protected: true },
    { name: "Workspace", path: "/workspace", icon: FolderKanban },
    { name: "Goals", path: "/goals", icon: Target },
    { name: "Announcements", path: "/announcements", icon: Megaphone },
    { name: "Tasks", path: "/tasks", icon: CheckSquare },
  ];

  if (!mounted) return null;

  return (
    <nav className="bg-white dark:bg-gray-900 shadow-md px-4 py-3">

      {/* TOP BAR */}
      <div className="flex items-center justify-between">

        {/* Logo */}
        <h1 className="text-xl font-bold text-blue-500">
          CollabHub
        </h1>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-6">

          {navLinks.map((item, i) => {
            if (item.protected && !user) return null;

            const Icon = item.icon;
            const active = pathname === item.path;

            return (
              <Link key={i} href={item.path}>
                <div
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg transition
                  ${
                    active
                      ? "bg-blue-500 text-white"
                      : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                  }`}
                >
                  <Icon size={18} />
                  {item.name}
                </div>
              </Link>
            );
          })}
        </div>

        {/* Right Controls */}
        <div className="flex items-center gap-3">

          {/* Theme */}
          <button
            onClick={() =>
              setTheme(theme === "light" ? "dark" : "light")
            }
            className="p-2 rounded-lg border dark:border-gray-700"
          >
            {theme === "light" ? <Moon size={18} /> : <Sun size={18} />}
          </button>

          {/* User */}
          <div className="hidden md:flex items-center gap-3">

            {user ? (
              <>
                <Link href="/profile">
                  <div className="w-9 h-9 rounded-full bg-blue-500 text-white flex items-center justify-center font-bold cursor-pointer">
                    {user.name?.charAt(0)}
                  </div>
                </Link>

                <button
                  onClick={handleLogout}
                  className="flex items-center gap-1 bg-red-500 text-white px-3 py-1 rounded-lg"
                >
                  <LogOut size={16} />
                  Logout
                </button>
              </>
            ) : (
              <Link href="/login">
                <button className="bg-blue-500 text-white px-3 py-1 rounded-lg">
                  Login
                </button>
              </Link>
            )}
          </div>

          {/* Mobile Menu */}
          <div className="md:hidden">
            {open ? (
              <X onClick={() => setOpen(false)} />
            ) : (
              <Menu onClick={() => setOpen(true)} />
            )}
          </div>
        </div>
      </div>

      {/* MOBILE MENU */}
      {open && (
        <div className="md:hidden mt-4 space-y-2">

          {navLinks.map((item, i) => {
            if (item.protected && !user) return null;

            const Icon = item.icon;

            return (
              <Link key={i} href={item.path}>
                <div className="flex items-center gap-2 p-3 rounded-lg border dark:border-gray-700">
                  <Icon size={18} />
                  {item.name}
                </div>
              </Link>
            );
          })}

          <div className="border-t pt-3">

            {user ? (
              <>
                <Link href="/profile">
                  <div className="flex items-center gap-2 p-3">
                    <User size={18} />
                    Profile
                  </div>
                </Link>

                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 p-3 text-red-500"
                >
                  <LogOut size={18} />
                  Logout
                </button>
              </>
            ) : (
              <Link href="/login">
                <div className="p-3 text-blue-500">
                  Login
                </div>
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}