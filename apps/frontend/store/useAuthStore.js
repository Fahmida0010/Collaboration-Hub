"use client";
import { create } from "zustand";

export const useAuthStore = create((set) => ({
  user: null,

  setUser: (user) => set({ user }),

  logout: async () => {
    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/logout`, {
      method: "POST",
      credentials: "include",
    });
    set({ user: null });
  },

  fetchUser: async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/me`,
        {
          credentials: "include",
        }
      );
      const data = await res.json();
      set({ user: data.user || null });
    } catch {
      set({ user: null });
    }
  },
}));