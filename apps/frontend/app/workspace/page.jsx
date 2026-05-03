"use client";

import { useEffect, useState } from "react";

export default function WorkspacePage() {
  const [workspaces, setWorkspaces] = useState([]);
  const [selectedWs, setSelectedWs] = useState(null);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [color, setColor] = useState("#3b82f6");

  const [inviteEmail, setInviteEmail] = useState("");
  const [role, setRole] = useState("MEMBER");

  useEffect(() => {
    fetchWorkspaces();
  }, []);

  const fetchWorkspaces = async () => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/workspace`,
    { credentials: "include" }
  );

  const data = await res.json();

  console.log("WORKSPACE API RESPONSE:", data);

  // FIX HERE (robust handling)
  setWorkspaces(Array.isArray(data) ? data : data?.data || []);
};

  // CREATE
 const createWorkspace = async () => {
  if (!name) return alert("Name required");

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/workspace`, {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, description, color }),
  });

  const data = await res.json();

  console.log("CREATE RESPONSE:", data);

  if (!res.ok) {
    alert(data.error || "Failed to create workspace");
    return;
  }

  setName("");
  setDescription("");
  fetchWorkspaces();
};
  // SWITCH
  const switchWorkspace = async (id) => {
    setSelectedWs(id);

    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/workspace/switch`, {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ workspaceId: id }),
    });
  };

  // INVITE
  const inviteMember = async () => {
    await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/workspace/invite`,
      {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: inviteEmail,
          workspaceId: selectedWs,
          role,
        }),
      }
    );

    alert("Invitation sent");
    setInviteEmail("");
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Workspaces</h1>

      {/* CREATE */}
      <div className="bg-white p-4 rounded shadow mb-6">
        <h2>Create Workspace</h2>

        <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" />
        <input value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description" />
        <input type="color" value={color} onChange={(e) => setColor(e.target.value)} />

        <button onClick={createWorkspace}>Create</button>
      </div>

      {/* LIST */}
     <div className="grid grid-cols-3 gap-4">
  {Array.isArray(workspaces) &&
    workspaces.map((ws) => (
      <div
        key={ws.id}
        onClick={() => switchWorkspace(ws.id)}
        className={`p-4 border rounded cursor-pointer ${
          selectedWs === ws.id ? "bg-blue-100" : "bg-white"
        }`}
        style={{ borderColor: ws.color }}
      >
        <h3 className="font-bold">{ws.name}</h3>
        <p className="text-sm text-gray-500">
          {ws.description || "No description"}
        </p>
      </div>
    ))}
</div>

      {/* INVITE */}
      {selectedWs && (
        <div className="mt-6">
          <input
            value={inviteEmail}
            onChange={(e) => setInviteEmail(e.target.value)}
            placeholder="Email"
          />

          <select value={role} onChange={(e) => setRole(e.target.value)}>
            <option value="MEMBER">Member</option>
            <option value="ADMIN">Admin</option>
          </select>

          <button onClick={inviteMember}>Invite</button>
        </div>
      )}
    </div>
  );
}