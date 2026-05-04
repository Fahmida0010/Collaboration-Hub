"use client";

import { useState } from "react";
import { postData } from "../../lib/api";

export default function CreateAnnouncement() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const create = async () => {
    await postData("/announcements", {
      title,
      content,
      workspaceId,
    });

      console.log("STATUS:", res?.status);
  console.log("RESPONSE:", res);
    alert("Announcement created");
  };

  return (
    <div className="p-6">
      <h1>Create Announcement</h1>

      <input
        placeholder="title"
        onChange={(e) => setTitle(e.target.value)}
      />

      <textarea
        placeholder="content"
        onChange={(e) => setContent(e.target.value)}
      />

      <button onClick={create}>Create</button>
    </div>
  );
}