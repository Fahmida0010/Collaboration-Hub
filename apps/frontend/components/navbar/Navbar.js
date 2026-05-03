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
import { useAuthStore } from "@/store/useAuthStore";

export default function Navbar() {
  const pathname = usePathname();
  const { user, fetchUser, logout } = useAuthStore();

  const [open, setOpen] = useState(false);
  const { setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    fetchUser();
  }, []);

  if (!mounted) return null;

  const navLinks = [
    { name: "Dashboard", path: "/dashboard", icon: LayoutDashboard, protected: true },
    { name: "Workspace", path: "/workspace", icon: FolderKanban },
    { name: "Goals", path: "/goals", icon: Target },
    { name: "Announcements", path: "/announcements", icon: Megaphone },
    { name: "Tasks", path: "/tasks", icon: CheckSquare },
  ];

  return (
    <nav className="bg-white dark:bg-gray-900 text-black dark:text-white shadow-md px-4 py-3 transition-colors">

      <div className="flex items-center justify-between">

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

        {/* Right */}
        <div className="flex items-center gap-3">

          {/* Theme */}
          <button
            onClick={() =>
              setTheme(resolvedTheme === "light" ? "dark" : "light")
            }
            className="p-2 rounded-lg border border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 transition"
          >
            {resolvedTheme === "light" ? <Moon size={18} /> : <Sun size={18} />}
          </button>

          {/* User */}
      <div className="hidden md:flex items-center gap-3">
  {user ? (
    <>
      <Link href="/profile">
        <div className="w-9 h-9 rounded-full overflow-hidden cursor-pointer">

          {user?.avatar ? (
            <img
              src={
                user.avatar.startsWith("http")
                  ? user.avatar
                  : `${process.env.NEXT_PUBLIC_API_URL}${user.avatar}`
              }
              alt="avatar"
              className="w-full h-full object-cover"
            />
          ) : user?.image ? (
            // Google login image (NextAuth / OAuth)
            <img
              src={user.image}
              alt="google avatar"
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-blue-500 text-white flex items-center justify-center font-bold uppercase">
              {user.name?.charAt(0).toUpperCase()}
            </div>
          )}

        </div>
      </Link>

      <button
        onClick={logout}
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

          {/* Mobile */}
          <div className="md:hidden">
            {open ? (
              <X onClick={() => setOpen(false)} />
            ) : (
              <Menu onClick={() => setOpen(true)} />
            )}
          </div>
        </div>
      </div>

      {/* Mobile menu */}
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
                  onClick={logout}
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