import React from "react";
import MoveBlock from "./blocks/MoveBlock";
import TurnBlock from "./blocks/TurnBlock";
import SayBlock from "./blocks/SayBlock";

export default function Canvas({ blocks, updateBlock }) {
  return (
    <div className="p-4 min-h-[300px] w-80 bg-white border rounded overflow-auto">
      {blocks.length === 0 && (
        <p className="text-gray-500 text-center">No blocks added yet</p>
      )}
      {blocks.map((block, index) => {
        switch (block.type.toLowerCase()) {
          case "move":
            return (
              <MoveBlock
                key={block.id}
                block={block}
                onChange={(val) => updateBlock(index, val)}
              />
            );
          case "turn":
            return (
              <TurnBlock
                key={block.id}
                block={block}
                onChange={(val) => updateBlock(index, val)}
              />
            );
          case "say":
            return (
              <SayBlock
                key={block.id}
                block={block}
                onChange={(val) => updateBlock(index, val)}
              />
            );
          default:
            return null;
        }
      })}
    </div>
  );
}
