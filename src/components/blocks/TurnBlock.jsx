import React from "react";

export default function TurnBlock({ block, onChange, disabled }) {
  return (
    <div className="p-3 m-1 bg-green-300 rounded flex items-center gap-2 select-text">
      <span>Turn</span>
      <input
        type="number"
        value={block.value}
        min={-360}
        max={360}
        disabled={disabled}
        onChange={(e) => onChange({ ...block, value: +e.target.value })}
        className="w-16 px-1 py-0.5 rounded border border-green-600"
      />
      <span>degrees</span>
    </div>
  );
}
