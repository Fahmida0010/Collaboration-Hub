"use client";

import ReactionBar from "./ReactionBar";
import CommentBox from "./CommentBox";

export default function AnnouncementCard({ item, onReact }) {
  return (
    <div className="border rounded p-4 mb-4 bg-white">
      <div className="flex justify-between">
        <h2 className="font-bold text-lg">
          {item.title} {item.isPinned && "📌"}
        </h2>
      </div>

      <p className="mt-2 text-gray-700">{item.content}</p>

      <ReactionBar item={item} onReact={onReact} />

      <CommentBox announcementId={item.id} comments={item.comments} />
    </div>
  );
}