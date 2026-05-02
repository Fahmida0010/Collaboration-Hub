"use client";

import { useEffect, useState } from "react";
import AnnouncementCard from "@/components/AnnouncementCard";
import { getData, postData } from "../lib/api";


export default function AnnouncementPage() {
  const [items, setItems] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const workspaceId = "workspace-1";

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    const data = await getData(`/announcements/${workspaceId}`);
    setItems(data);
  };

  const create = async () => {
    const newItem = await postData("/announcements", {
      title,
      content,
      workspaceId,
    });

    setItems([newItem, ...items]);
    setTitle("");
    setContent("");
  };

  const react = async (id, emoji) => {
    await postData("/announcements/reaction", {
      announcementId: id,
      emoji,
    });

    load();
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Announcements</h1>

      {/* CREATE FORM */}
      <div className="my-4">
        <input
          className="border p-2 w-full mb-2"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea
          className="border p-2 w-full mb-2"
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />

        <button
          className="bg-blue-500 text-white px-4 py-2"
          onClick={create}
        >
          Publish
        </button>
      </div>

      {/* LIST */}
      <div>
        {items.map((item) => (
          <AnnouncementCard
            key={item.id}
            item={item}
            onReact={react}
          />
        ))}
      </div>
    </div>
  );
}