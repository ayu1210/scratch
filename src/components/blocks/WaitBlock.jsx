import React from "react";

export default function WaitBlock({ block, onChange, disabled }) {
  return (
    <div className="p-3 m-1 bg-gray-400 rounded flex items-center gap-2 select-text">
      <span>Wait</span>
      <input
        type="number"
        value={block.value}
        min={100}
        max={5000}
        step={100}
        disabled={disabled}
        onChange={(e) => onChange({ ...block, value: +e.target.value })}
        className="w-20 px-1 py-0.5 rounded border border-gray-600"
      />
      <span>ms</span>
    </div>
  );
}
