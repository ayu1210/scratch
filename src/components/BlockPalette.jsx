import React from "react";

export default function BlockPalette({ onAddBlock }) {
  return (
    <div className="flex flex-col gap-2">
      <button
        className="p-2 bg-blue-500 text-white rounded"
        onClick={() => onAddBlock("Move")}
      >
        Add Move Block
      </button>
      <button
        className="p-2 bg-green-500 text-white rounded"
        onClick={() => onAddBlock("Turn")}
      >
        Add Turn Block
      </button>
      <button
        className="p-2 bg-yellow-500 text-black rounded"
        onClick={() => onAddBlock("Say")}
      >
        Add Say Block
      </button>
    </div>
  );
}
