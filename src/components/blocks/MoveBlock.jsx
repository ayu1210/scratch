import React from "react";

export default function MoveBlock({ block, onChange }) {
  return (
    <div className="p-2 m-1 bg-blue-300 rounded flex items-center">
      Move
      <input
        type="number"
        value={block.value}
        onChange={(e) =>
          onChange({ ...block, value: Number(e.target.value) })
        }
        className="mx-2 w-16 p-1 rounded border"
        placeholder="steps (-/+)"
      />
      steps
    </div>
  );
}
