import React from "react";

export default function Palette({ addCommand }) {
  const buttons = [
    { type: "move", label: "Move +20px" },
    { type: "turn", label: "Turn +90°" },
    { type: "say", label: "Say 'Hello!'" },
    { type: "wait", label: "Wait 1s" },
  ];

  return (
    <div className="flex flex-col gap-3">
      {buttons.map(({ type, label }) => (
        <button
          key={type}
          onClick={() => addCommand({ type, value: type === "move" || type === "turn" ? 20 : type === "say" ? "Hello!" : 1000 })}
          className="bg-indigo-500 hover:bg-indigo-600 text-white py-2 rounded-lg shadow-md transition duration-300 font-medium"
          aria-label={`Add ${label} block`}
        >
          {label}
        </button>
      ))}
    </div>
  );
}
