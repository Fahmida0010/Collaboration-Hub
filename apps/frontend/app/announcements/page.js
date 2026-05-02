"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
// import { api } from "@/lib/api";

export default function Announcements() {
  const { data: session } = useSession();

  const userId = session?.user?.id; // ✅ REAL USER
  const [list, setList] = useState([]);
  const [text, setText] = useState("");

  useEffect(() => {
    if (userId) load();
  }, [userId]);

  const load = async () => {
    const data = await api("/announcements");
    setList(data);
  };

  const create = async () => {
    await api("/announcements", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-user-id": userId, // 🔥 IMPORTANT
      },
      body: JSON.stringify({ content: text }),
    });

    setText("");
    load();
  };

  if (!session) return <p>Loading...</p>;

  return (
    <div className="p-6 max-w-3xl mx-auto">

      <h1 className="text-2xl font-bold mb-4">📢 Announcements</h1>

      {/* CREATE */}
      <div className="bg-white p-4 shadow rounded mb-4">
        <textarea
          className="w-full border p-2"
          placeholder="Write announcement..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />

        <button onClick={create} className="bg-blue-600 text-white px-4 py-2 mt-2">
          Publish
        </button>
      </div>

      {/* LIST */}
      {list.map((a) => (
        <div key={a.id} className="bg-white p-4 shadow mb-4 rounded">

          {a.isPinned && (
            <span className="text-xs bg-yellow-300 px-2 py-1">📌 Pinned</span>
          )}

          <p className="mt-2">{a.content}</p>

          {/* REACTIONS */}
          <div className="flex gap-2 mt-2">
            {["👍","🔥","❤️"].map((e) => (
              <button
                key={e}
                onClick={() =>
                  api(`/announcements/${a.id}/react`, {
                    method: "POST",
                    headers: {
                      "Content-Type": "application/json",
                      "x-user-id": userId,
                    },
                    body: JSON.stringify({ emoji: e }),
                  }).then(load)
                }
              >
                {e}
              </button>
            ))}
          </div>

          {/* COMMENTS */}
          <CommentBox a={a} load={load} userId={userId} />

          {/* PIN */}
          <button
            onClick={() =>
              api(`/announcements/${a.id}/pin`, { method: "PATCH" }).then(load)
            }
            className="text-xs text-blue-500 mt-2"
          >
            Pin
          </button>

        </div>
      ))}
    </div>
  );
}

function CommentBox({ a, load, userId }) {
  const [msg, setMsg] = useState("");

  return (
    <div className="mt-2">
      {a.comments.map((c) => (
        <p key={c.id} className="text-sm text-gray-600">
          💬 {c.text}
        </p>
      ))}

      <div className="flex gap-2 mt-1">
        <input
          className="border p-1 flex-1"
          value={msg}
          onChange={(e) => setMsg(e.target.value)}
        />
        <button
          onClick={() =>
            api(`/announcements/${a.id}/comment`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                "x-user-id": userId,
              },
              body: JSON.stringify({ text: msg }),
            }).then(() => {
              setMsg("");
              load();
            })
          }
        >
          Send
        </button>
      </div>
    </div>
  );
}