"use client";

import { useEffect, useState } from "react";

export default function GoalsPage() {
  const [goals, setGoals] = useState([]);
  const [title, setTitle] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [workspaceId] = useState("workspace-1");

  const [selectedGoal, setSelectedGoal] = useState(null);

  const [milestoneTitle, setMilestoneTitle] = useState("");
  const [progress, setProgress] = useState("");

  const [activityMsg, setActivityMsg] = useState("");

  // LOAD GOALS
  useEffect(() => {
    loadGoals();
  }, []);

  const loadGoals = async () => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/goals/${workspaceId}`,
      {
        credentials: "include",
      }
    );
    const data = await res.json();
    setGoals(data);
  };

  // CREATE GOAL
  const createGoal = async () => {
    if (!title) return;

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/goals`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        title,
        status: "TODO",
        workspaceId,
        dueDate: dueDate || new Date().toISOString(),
      }),
    });

    const newGoal = await res.json();
    setGoals((prev) => [newGoal, ...prev]);

    setTitle("");
    setDueDate("");
  };

  // ADD MILESTONE
  const addMilestone = async (goalId) => {
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

    const newMilestone = await res.json();

    setGoals((prev) =>
      prev.map((g) =>
        g.id === goalId
          ? {
              ...g,
              milestones: [...(g.milestones || []), newMilestone],
            }
          : g
      )
    );

    setMilestoneTitle("");
    setProgress("");
  };

  // ADD ACTIVITY
  const addActivity = async (goalId) => {
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

    const newActivity = await res.json();

    setGoals((prev) =>
      prev.map((g) =>
        g.id === goalId
          ? {
              ...g,
              activities: [...(g.activities || []), newActivity],
            }
          : g
      )
    );

    setActivityMsg("");
  };

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-xl font-bold">Goals</h1>

      {/* CREATE GOAL */}
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

      {/* GOAL LIST */}
      <div className="space-y-6">
        {goals.map((goal) => (
          <div key={goal.id} className="border p-4 rounded">
            <h2 className="font-bold text-lg">{goal.title}</h2>
            <p>Status: {goal.status}</p>
            <p>
              Due:{" "}
              {goal.dueDate
                ? new Date(goal.dueDate).toDateString()
                : "N/A"}
            </p>

            {/* MILESTONES */}
            <div className="mt-3">
              <h3 className="font-semibold">Milestones</h3>

              <div className="flex gap-2 mt-2">
                <input
                  placeholder="title"
                  className="border p-1"
                  value={milestoneTitle}
                  onChange={(e) => setMilestoneTitle(e.target.value)}
                />

                <input
                  placeholder="%"
                  className="border p-1 w-20"
                  value={progress}
                  onChange={(e) => setProgress(e.target.value)}
                />

                <button
                  className="bg-green-500 text-white px-2"
                  onClick={() => addMilestone(goal.id)}
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
              <h3 className="font-semibold">Activity Feed</h3>

              <div className="flex gap-2 mt-2">
                <input
                  placeholder="update..."
                  className="border p-1"
                  value={activityMsg}
                  onChange={(e) => setActivityMsg(e.target.value)}
                />

                <button
                  className="bg-purple-500 text-white px-2"
                  onClick={() => addActivity(goal.id)}
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
    </div>
  );
}