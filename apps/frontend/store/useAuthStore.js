"use client";
import { create } from "zustand";

export const useAuthStore = create((set, get) => ({

 //auth state
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

    set({ user: data.user });
  } catch (error) {
    console.log(error);
  }
},
    // ======================
  // GOALS STATE
  // ======================
  goals: [],
  selectedGoal: null,

  setGoals: (goals) => set({ goals }),

  setSelectedGoal: (goal) => set({ selectedGoal: goal }),

  // ADD GOAL (optimistic update)
  addGoal: (goal) =>
    set((state) => ({
      goals: [goal, ...state.goals],
    })),

  // UPDATE GOAL (milestone/activity add etc.)
  updateGoal: (goalId, updatedData) =>
    set((state) => ({
      goals: state.goals.map((g) =>
        g.id === goalId ? { ...g, ...updatedData } : g
      ),
    })),

  // LOAD GOALS FROM API
  fetchGoals: async (workspaceId) => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/goals/${workspaceId}`,
        {
          credentials: "include",
        }
      );

      const data = await res.json();

      set({
        goals: Array.isArray(data) ? data : data.goals || [],
      });
    } catch (err) {
      set({ goals: [] });
    }
  },

  // ADD MILESTONE
  addMilestone: async (goalId, milestoneData) => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/goals/milestone`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(milestoneData),
      }
    );

    const newMilestone = await res.json();

    get().updateGoal(goalId, {
      milestones: [
        ...(get().goals.find((g) => g.id === goalId)?.milestones || []),
        newMilestone,
      ],
    });
  },

  // ADD ACTIVITY
  addActivity: async (goalId, activityData) => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/goals/activity`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(activityData),
      }
    );

    const newActivity = await res.json();

    get().updateGoal(goalId, {
      activities: [
        ...(get().goals.find((g) => g.id === goalId)?.activities || []),
        newActivity,
      ],
    });
  },
}));
