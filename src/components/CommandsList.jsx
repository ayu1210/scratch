import React from "react";

export default function CommandsList({
  commands,
  updateCommand,
  removeCommand,
  disabled,
}) {
  return (
    <div className="flex-1 flex flex-col gap-4 max-h-[400px] overflow-y-auto pr-2">
      <h2 className="text-xl font-semibold text-indigo-700">Commands</h2>
      {commands.length === 0 && (
        <p className="text-gray-500 italic">No commands added yet.</p>
      )}
      {commands.map(({ id, type, value }) => (
        <div
          key={id}
          className="bg-white p-4 rounded-xl shadow flex items-center gap-4 border border-indigo-200"
        >
          <div className="flex-1">
            <label
              htmlFor={`value-${id}`}
              className="block text-sm font-medium text-indigo-700 mb-1"
            >
              {type.charAt(0).toUpperCase() + type.slice(1)} Value
            </label>

            {type === "say" ? (
              <input
                id={`value-${id}`}
                type="text"
                value={value}
                onChange={(e) => updateCommand(id, { value: e.target.value })}
                disabled={disabled}
                className="w-full rounded border border-indigo-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
              />
            ) : type === "wait" ? (
              <input
                id={`value-${id}`}
                type="number"
                min={100}
                step={100}
                value={value / 1000}
                onChange={(e) =>
                  updateCommand(id, { value: e.target.value * 1000 })
                }
                disabled={disabled}
                className="w-20 rounded border border-indigo-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
              />
            ) : (
              <input
                id={`value-${id}`}
                type="number"
                value={value}
                onChange={(e) =>
                  updateCommand(id, { value: Number(e.target.value) })
                }
                disabled={disabled}
                className="w-20 rounded border border-indigo-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
              />
            )}
          </div>
          <button
            onClick={() => removeCommand(id)}
            disabled={disabled}
            className="text-red-500 hover:text-red-700 disabled:text-red-300 transition-colors"
            aria-label={`Remove ${type} command`}
          >
            ✕
          </button>
        </div>
      ))}
    </div>
  );
}
