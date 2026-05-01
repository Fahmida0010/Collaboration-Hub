"use client";

import { useEffect, useState } from "react";

export default function WorkspacePage() {
  const [workspaces, setWorkspaces] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [color, setColor] = useState("#3b82f6");

  const [inviteEmail, setInviteEmail] = useState("");
  const [selectedWs, setSelectedWs] = useState(null);

  useEffect(() => {
    fetchWorkspaces();
  }, []);

  const fetchWorkspaces = async () => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/workspace`,
      { credentials: "include" }
    );
    const data = await res.json();
    setWorkspaces(data);
  };

  // CREATE WORKSPACE
  const createWorkspace = async () => {
    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/workspace`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, description, color }),
    });

    setName("");
    setDescription("");
    fetchWorkspaces();
  };

  // INVITE MEMBER
  const inviteMember = async () => {
    await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/workspace/invite`,
      {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: inviteEmail,
          workspaceId: selectedWs,
          role: "MEMBER",
        }),
      }
    );

    setInviteEmail("");
    alert("Invitation sent");
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">
        Workspaces
      </h1>

      {/* CREATE */}
      <div className="bg-white p-4 rounded shadow mb-6">
        <h2 className="font-semibold mb-2">
          Create Workspace
        </h2>

        <input
          className="border p-2 w-full mb-2"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          className="border p-2 w-full mb-2"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <input
          type="color"
          value={color}
          onChange={(e) => setColor(e.target.value)}
          className="mb-3"
        />

        <button
          onClick={createWorkspace}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Create
        </button>
      </div>

      {/* LIST */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        {workspaces.map((ws) => (
          <div
            key={ws.id}
            onClick={() => setSelectedWs(ws.id)}
            className={`p-4 rounded shadow cursor-pointer ${
              selectedWs === ws.id
                ? "border-2 border-blue-500"
                : "bg-white"
            }`}
          >
            <h3 className="font-bold">{ws.name}</h3>
            <p className="text-sm">{ws.description}</p>
          </div>
        ))}
      </div>

      {/* INVITE */}
      {selectedWs && (
        <div className="bg-white p-4 rounded shadow">
          <h2 className="font-semibold mb-2">
            Invite Member
          </h2>

          <input
            className="border p-2 w-full mb-2"
            placeholder="Email"
            value={inviteEmail}
            onChange={(e) => setInviteEmail(e.target.value)}
          />

          <button
            onClick={inviteMember}
            className="bg-green-500 text-white px-4 py-2 rounded"
          >
            Send Invite
          </button>
        </div>
      )}
    </div>
  );
}