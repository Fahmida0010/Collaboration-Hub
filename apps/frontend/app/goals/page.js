"use client";

import { useAuthStore } from "@/store/useAuthStore";
import { useEffect, useState } from "react";


export default function GoalsPage() {
  const {
    goals,
    fetchGoals,
    addGoal,
    addMilestone,
    addActivity,
  } = useAuthStore();

  const [title, setTitle] = useState("");
  const [dueDate, setDueDate] = useState("");
  const workspaceId = "workspace.id";

  const [milestoneTitle, setMilestoneTitle] = useState("");
  const [progress, setProgress] = useState("");
  const [activityMsg, setActivityMsg] = useState("");

  // LOAD GOALS
  useEffect(() => {
    fetchGoals(workspaceId);
  }, []);

  // CREATE GOAL
  const createGoal = async () => {
    if (!title) return;

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/goals`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({
        title,
        status: "TODO",
        workspaceId,
         ownerId: req.user.id,
        dueDate: dueDate || new Date().toISOString(),
      }),
    });

    const data = await res.json();
  
    console.log(res.status);
   console.log(data);

addGoal(data);


    setTitle("");
    setDueDate("");
  };

  // MILESTONE
  const handleMilestone = async (goalId) => {
    if (!milestoneTitle || !progress) return;

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/goals/milestone`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          title: milestoneTitle,
          goalId,
          progress: Number(progress),
        }),
      }
    );

    const data = await res.json();

    addMilestone(goalId, data);

    setMilestoneTitle("");
    setProgress("");
  };

  // ACTIVITY
  const handleActivity = async (goalId) => {
    if (!activityMsg) return;

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/goals/activity`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          message: activityMsg,
          goalId,
        }),
      }
    );

    const data = await res.json();

    addActivity(goalId, data);

    setActivityMsg("");
  };

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-xl font-bold">Goals</h1>

      {/* CREATE */}
      <div className="flex gap-2">
        <input
          className="border p-2"
          placeholder="Goal title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <input
          type="date"
          className="border p-2"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
        />

        <button
          onClick={createGoal}
          className="bg-blue-500 text-white px-4"
        >
          Create
        </button>
      </div>

      {/* LIST */}
      {goals?.map((goal) => (
        <div key={goal.id} className="border p-4 rounded">
          <h2 className="font-bold">{goal.title}</h2>

          <p>Status: {goal.status}</p>

          <p>
            Due:{" "}
            {goal.dueDate
              ? new Date(goal.dueDate).toDateString()
              : "N/A"}
          </p>

          {/* MILESTONE */}
          <div className="mt-3">
            <h3>Milestones</h3>

            <div className="flex gap-2">
              <input
                className="border p-1"
                placeholder="title"
                value={milestoneTitle}
                onChange={(e) => setMilestoneTitle(e.target.value)}
              />

              <input
                className="border p-1 w-20"
                placeholder="%"
                value={progress}
                onChange={(e) => setProgress(e.target.value)}
              />

              <button
                onClick={() => handleMilestone(goal.id)}
                className="bg-green-500 text-white px-2"
              >
                Add
              </button>
            </div>

            {goal.milestones?.map((m) => (
              <p key={m.id}>
                • {m.title} ({m.progress}%)
              </p>
            ))}
          </div>

          {/* ACTIVITY */}
          <div className="mt-3">
            <h3>Activity</h3>

            <div className="flex gap-2">
              <input
                className="border p-1"
                placeholder="message"
                value={activityMsg}
                onChange={(e) => setActivityMsg(e.target.value)}
              />

              <button
                onClick={() => handleActivity(goal.id)}
                className="bg-purple-500 text-white px-2"
              >
                Post
              </button>
            </div>

            {goal.activities?.map((a) => (
              <p key={a.id}>• {a.message}</p>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}