import React from "react";

export default function SayBlock({ block, onChange, disabled }) {
  return (
    <div className="p-3 m-1 bg-purple-300 rounded flex items-center gap-2 select-text">
      <span>Say</span>
      <input
        type="text"
        value={block.value}
        disabled={disabled}
        onChange={(e) => onChange({ ...block, value: e.target.value })}
        className="flex-1 px-1 py-0.5 rounded border border-purple-600"
        placeholder="Type something..."
      />
    </div>
  );
}
