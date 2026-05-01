"use client";

import { useEffect, useState } from "react";

export default function DashboardPage() {
  const [stats, setStats] = useState({
    totalGoals: 0,
    completedThisWeek: 0,
    overdue: 0,
  });

  const [workspaces, setWorkspaces] = useState([]);

  useEffect(() => {
    fetchStats();
    fetchWorkspaces();
  }, []);

  const fetchStats = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/dashboard/stats`,
        { credentials: "include" }
      );
      const data = await res.json();
      setStats(data);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchWorkspaces = async () => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/workspace`,
      { credentials: "include" }
    );
    const data = await res.json();
    setWorkspaces(data);
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-gray-500 text-sm">Total Goals</h2>
          <p className="text-2xl font-bold">{stats.totalGoals}</p>
        </div>

        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-gray-500 text-sm">Completed This Week</h2>
          <p className="text-2xl font-bold">{stats.completedThisWeek}</p>
        </div>

        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-gray-500 text-sm">Overdue</h2>
          <p className="text-2xl font-bold text-red-500">
            {stats.overdue}
          </p>
        </div>
      </div>

      {/* Workspace List */}
      <h2 className="text-xl font-semibold mb-4">
        Your Workspaces
      </h2>

      <div className="grid grid-cols-3 gap-4">
        {workspaces.map((ws) => (
          <div
            key={ws.id}
            className="bg-white p-4 rounded shadow hover:shadow-lg cursor-pointer"
            onClick={() =>
              (window.location.href = `/workspace?id=${ws.id}`)
            }
          >
            <h3 className="font-bold">{ws.name}</h3>
            <p className="text-sm text-gray-500">
              {ws.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}