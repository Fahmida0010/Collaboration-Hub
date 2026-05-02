"use client";

export default function ReactionBar({ item, onReact }) {
  return (
    <div className="flex gap-2 mt-3">
      <button onClick={() => onReact(item.id, "👍")}>👍</button>
      <button onClick={() => onReact(item.id, "❤️")}>❤️</button>
      <button onClick={() => onReact(item.id, "😂")}>😂</button>

      <span className="text-sm text-gray-500 ml-2">
        {item.reactions?.length || 0} reactions
      </span>
    </div>
  );
}