"use client";

import { useEffect, useState } from "react";
import { getData } from "@/lib/api";

export default function AnnouncementDetails({ params }) {
  const [item, setItem] = useState(null);

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    const data = await getData(`/announcements/workspace-1`);
    const found = data.find((a) => a.id === params.id);
    setItem(found);
  };

  if (!item) return <p>Loading...</p>;

  return (
    <div className="p-6">
      <h1>{item.title}</h1>
      <p>{item.content}</p>
    </div>
  );
}