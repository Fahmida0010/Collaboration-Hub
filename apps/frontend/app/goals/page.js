"use client";

import { useEffect, useState } from "react";
// import { getData, postData } from "../../../frontend/lib/api";


export default function GoalsPage() {
  const [goals, setGoals] = useState([]);
  const [title, setTitle] = useState("");
  const [owner, setOwner] = useState("");

  useEffect(() => {
    loadGoals();
  }, []);

  const loadGoals = async () => {
    const data = await getData("/goals");
    setGoals(data);
  };

  const createGoal = async () => {
    const newGoal = await postData("/goals", {
      title,
      owner,
      dueDate: new Date().toISOString(),
    });

    setGoals([newGoal, ...goals]);
  };

  return (
    <div className="p-6">
      <h1>Goals</h1>

      <input placeholder="title" onChange={(e) => setTitle(e.target.value)} />
      <input placeholder="owner" onChange={(e) => setOwner(e.target.value)} />

      <button onClick={createGoal}>Create</button>

      {goals.map((g) => (
        <div key={g.id}>
          <h3>{g.title}</h3>
          <p>{g.owner}</p>
        </div>
      ))}
    </div>
  );
}