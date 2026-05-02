"use client";

import { postData } from "@/app/lib/api";
import { useState } from "react";


export default function CommentBox({ announcementId, comments }) {
  const [text, setText] = useState("");

  const addComment = async () => {
    if (!text) return;

    await postData("/announcements/comment", {
      text,
      announcementId,
    });

    setText("");
    window.location.reload(); // simple refresh (later replace with state update)
  };

  return (
    <div className="mt-4">
      <div className="text-sm text-gray-600">
        {comments?.map((c) => (
          <p key={c.id}>💬 {c.text}</p>
        ))}
      </div>

      <div className="flex gap-2 mt-2">
        <input
          className="border p-1 flex-1"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Write comment..."
        />
        <button onClick={addComment}>Send</button>
      </div>
    </div>
  );
}