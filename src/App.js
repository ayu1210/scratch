import React, { useState, useEffect, useRef } from "react";
import { v4 as uuidv4 } from "uuid";
import "./App.css";

export default function App() {
  const [sprite1Blocks, setSprite1Blocks] = useState([]);
  const [sprite2Blocks, setSprite2Blocks] = useState([]);
  const [runAll, setRunAll] = useState(false);
  const [collision, setCollision] = useState(false);
  const [canSwap, setCanSwap] = useState(false);

  // Add block to sprite's program
  const addBlock = (sprite, category, type) => {
    let defaultValue;
    switch (type) {
      case "moveSteps":
        defaultValue = 20;
        break;
      case "turn":
        defaultValue = 15;
        break;
      case "goto":
        defaultValue = { x: 100, y: 150 };
        break;
      case "say":
      case "think":
        defaultValue = { text: "Hello!", seconds: 2 };
        break;
      case "repeat":
        defaultValue = 3;
        break;
      default:
        defaultValue = "";
    }

    const newBlock = {
      id: uuidv4(),
      category,
      type,
      value: defaultValue,
    };

    if (sprite === 1) setSprite1Blocks((prev) => [...prev, newBlock]);
    else setSprite2Blocks((prev) => [...prev, newBlock]);
  };

  // Update block value
  const updateBlock = (sprite, index, updatedBlock) => {
    const updater = sprite === 1 ? setSprite1Blocks : setSprite2Blocks;
    const blocks = sprite === 1 ? sprite1Blocks : sprite2Blocks;
    const newBlocks = [...blocks];
    newBlocks[index] = updatedBlock;
    updater(newBlocks);
  };

  // Run all sprites animation
  const handleRun = () => {
    setCollision(false);
    setCanSwap(false);
    setRunAll(false);
    setTimeout(() => setRunAll(true), 100); // Trigger run
  };

  // Swap commands of sprites after collision
  const handleSwap = () => {
    setSprite1Blocks((prev) => [...sprite2Blocks]);
    setSprite2Blocks((prev) => [...sprite1Blocks]);
    setCanSwap(false);
    setCollision(false);
  };

  // Called when collision detected inside sprite
  const onCollisionDetected = () => {
    setCollision(true);
    setCanSwap(true);
  };

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      <div className="flex gap-12 justify-center">
        <BlockPalette sprite={1} addBlock={addBlock} />
        <Canvas sprite={1} blocks={sprite1Blocks} updateBlock={updateBlock} />
        <BlockPalette sprite={2} addBlock={addBlock} />
        <Canvas sprite={2} blocks={sprite2Blocks} updateBlock={updateBlock} />
      </div>

      <div className="flex justify-center gap-4">
        <button
          onClick={handleRun}
          className="px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
        >
          Run All
        </button>

        {canSwap && (
          <button
            onClick={handleSwap}
            className="px-6 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
          >
            Swap Animations (Hero Feature)
          </button>
        )}
      </div>

      <div className="relative h-[400px] bg-blue-100 rounded overflow-hidden mt-6 border border-blue-300">
        <Sprite
          id="sprite1"
          commands={sprite1Blocks}
          run={runAll}
          color="bg-orange-400"
          startX={50}
          startY={150}
          onCollision={onCollisionDetected}
        />
        <Sprite
          id="sprite2"
          commands={sprite2Blocks}
          run={runAll}
          color="bg-pink-400"
          startX={300}
          startY={150}
          onCollision={onCollisionDetected}
        />

        {collision && (
          <div className="absolute top-3 left-1/2 transform -translate-x-1/2 bg-red-600 text-white px-5 py-2 rounded shadow-lg font-semibold">
            Collision Detected!
          </div>
        )}
      </div>
    </div>
  );
}

// Block palette showing blocks grouped by category
function BlockPalette({ sprite, addBlock }) {
  return (
    <div className="w-48 p-4 bg-gray-100 rounded shadow">
      <h2 className="font-bold mb-3 text-center">Sprite {sprite} Blocks</h2>

      <h3 className="font-semibold mt-2 mb-1">Motion</h3>
      <button
        onClick={() => addBlock(sprite, "motion", "moveSteps")}
        className="block mb-1 p-1 bg-blue-300 rounded w-full"
      >
        Move Steps
      </button>
      <button
        onClick={() => addBlock(sprite, "motion", "turn")}
        className="block mb-1 p-1 bg-blue-300 rounded w-full"
      >
        Turn Degrees
      </button>
      <button
        onClick={() => addBlock(sprite, "motion", "goto")}
        className="block mb-1 p-1 bg-blue-300 rounded w-full"
      >
        Go to X,Y
      </button>
      <button
        onClick={() => addBlock(sprite, "motion", "repeat")}
        className="block mb-1 p-1 bg-blue-300 rounded w-full"
      >
        Repeat Blocks
      </button>

      <h3 className="font-semibold mt-4 mb-1">Looks</h3>
      <button
        onClick={() => addBlock(sprite, "looks", "say")}
        className="block mb-1 p-1 bg-purple-300 rounded w-full"
      >
        Say for Seconds
      </button>
      <button
        onClick={() => addBlock(sprite, "looks", "think")}
        className="block mb-1 p-1 bg-purple-300 rounded w-full"
      >
        Think for Seconds
      </button>
    </div>
  );
}

// Canvas shows the block program for each sprite with editing inputs
function Canvas({ sprite, blocks, updateBlock }) {
  // Helper to update block value based on type and input changes
  const onChangeValue = (block, index, e) => {
    let newValue;
    if (block.type === "goto") {
      // Update x or y separately (inputs named x or y)
      const key = e.target.name;
      newValue = { ...block.value, [key]: +e.target.value };
    } else if (block.type === "say" || block.type === "think") {
      if (e.target.name === "text") {
        newValue = { ...block.value, text: e.target.value };
      } else {
        newValue = { ...block.value, seconds: +e.target.value };
      }
    } else if (block.type === "repeat") {
      newValue = +e.target.value;
    } else if (block.type === "turn") {
      newValue = +e.target.value;
    } else {
      // moveSteps or others
      newValue = +e.target.value;
    }

    updateBlock(sprite, index, { ...block, value: newValue });
  };

  return (
    <div className="p-4 bg-white border min-w-[260px] rounded max-h-[400px] overflow-y-auto">
      <h3 className="font-semibold mb-2">Sprite {sprite} Code</h3>
      {blocks.length === 0 && <div className="text-gray-400">No blocks added</div>}

      {blocks.map((block, i) => (
        <div key={block.id} className="m-2 p-2 bg-gray-200 rounded flex flex-col gap-2">
          <div className="font-semibold capitalize">{block.type.replace(/([A-Z])/g, " $1")}</div>

          {/* Inputs for each block type */}
          {(block.type === "moveSteps" || block.type === "turn" || block.type === "repeat") && (
            <input
              className="p-1 rounded border border-gray-400 w-full"
              type="number"
              value={block.value}
              min={block.type === "repeat" ? 1 : undefined}
              onChange={(e) => onChangeValue(block, i, e)}
            />
          )}

          {block.type === "goto" && (
            <div className="flex gap-2">
              <input
                type="number"
                name="x"
                className="p-1 rounded border border-gray-400 w-1/2"
                value={block.value.x}
                onChange={(e) => onChangeValue(block, i, e)}
              />
              <input
                type="number"
                name="y"
                className="p-1 rounded border border-gray-400 w-1/2"
                value={block.value.y}
                onChange={(e) => onChangeValue(block, i, e)}
              />
            </div>
          )}

          {(block.type === "say" || block.type === "think") && (
            <>
              <input
                type="text"
                name="text"
                className="p-1 rounded border border-gray-400"
                value={block.value.text}
                onChange={(e) => onChangeValue(block, i, e)}
              />
              <input
                type="number"
                name="seconds"
                min={1}
                className="p-1 rounded border border-gray-400 mt-1"
                value={block.value.seconds}
                onChange={(e) => onChangeValue(block, i, e)}
              />
            </>
          )}
        </div>
      ))}
    </div>
  );
}

// Sprite component executes the blocks step by step with animation
function Sprite({ id, commands, run, color, startX, startY, onCollision }) {
  const ref = useRef();
  const pos = useRef({ x: startX, y: startY });
  const rotation = useRef(0);

  // Helper to delay for milliseconds
  const delay = (ms) => new Promise((res) => setTimeout(res, ms));

  // State for say/think bubble
  const [bubble, setBubble] = useState(null);

  // Animate position and rotation with React style updates
  const [style, setStyle] = useState({
    transform: `translate(${startX}px, ${startY}px) rotate(0deg)`,
  });

  // Run commands one by one
  useEffect(() => {
    if (!run) return;

    let cancelled = false;

    async function runCommands() {
      pos.current = { x: startX, y: startY };
      rotation.current = 0;
      setBubble(null);

      // Helper to animate moving
      const animateMove = async (dx, dy) => {
        const steps = 20;
        const stepX = dx / steps;
        const stepY = dy / steps;
        for (let i = 0; i < steps; i++) {
          if (cancelled) return;
          pos.current.x += stepX;
          pos.current.y += stepY;
          updateStyle();
          checkCollision();
          await delay(30);
        }
      };

      // Helper to animate rotation
      const animateRotate = async (deg) => {
        const steps = 20;
        const stepDeg = deg / steps;
        for (let i = 0; i < steps; i++) {
          if (cancelled) return;
          rotation.current += stepDeg;
          updateStyle();
          checkCollision();
          await delay(30);
        }
      };

      // Update CSS style transform for position & rotation
      const updateStyle = () => {
        setStyle({
          transform: `translate(${pos.current.x}px, ${pos.current.y}px) rotate(${rotation.current}deg)`,
          transition: "transform 0.03s linear",
        });
      };

      // Check collision with other sprite by querying DOM
      const checkCollision = () => {
        const el = ref.current;
        if (!el) return;

        // Find other sprite element
        const allSprites = document.querySelectorAll(".sprite");
        let collided = false;
        allSprites.forEach((spriteEl) => {
          if (spriteEl === el) return;
          if (isColliding(el, spriteEl)) {
            collided = true;
          }
        });

        if (collided) {
          onCollision();
        }
      };

      // Collision detection helper
      const isColliding = (a, b) => {
        const rect1 = a.getBoundingClientRect();
        const rect2 = b.getBoundingClientRect();
        return !(
          rect1.right < rect2.left ||
          rect1.left > rect2.right ||
          rect1.bottom < rect2.top ||
          rect1.top > rect2.bottom
        );
      };

      // Recursive function to run blocks with repeat support
      const runBlock = async (block, localCommands) => {
        if (cancelled) return;

        switch (block.type) {
          case "moveSteps": {
            // Move right by default
            await animateMove(block.value, 0);
            break;
          }
          case "turn": {
            await animateRotate(block.value);
            break;
          }
          case "goto": {
            // Go instantly
            pos.current.x = block.value.x;
            pos.current.y = block.value.y;
            updateStyle();
            checkCollision();
            await delay(300);
            break;
          }
          case "say": {
            setBubble({ type: "say", text: block.value.text });
            await delay(block.value.seconds * 1000);
            setBubble(null);
            break;
          }
          case "think": {
            setBubble({ type: "think", text: block.value.text });
            await delay(block.value.seconds * 1000);
            setBubble(null);
            break;
          }
          case "repeat": {
            // Repeat the previous blocks (except the repeat itself) n times
            // We'll just repeat all except this block
            for (let i = 0; i < block.value; i++) {
              for (let b of localCommands.filter((c) => c !== block)) {
                await runBlock(b, localCommands);
              }
            }
            break;
          }
          default:
            break;
        }
      };

      // Run all commands sequentially
      for (const block of commands) {
        await runBlock(block, commands);
      }
    }

    runCommands();

    return () => {
      cancelled = true;
      setBubble(null);
    };
  }, [run, commands, onCollision, startX, startY]);

  return (
    <>
      <div
        ref={ref}
        className={`sprite absolute w-20 h-20 rounded-full ${color} flex items-center justify-center font-bold text-white select-none cursor-default`}
        style={style}
      >
        {id === "sprite1" ? "S1" : "S2"}

        {/* Say/Think bubble */}
        {bubble && (
          <div
            className={`absolute -top-12 left-1/2 transform -translate-x-1/2 whitespace-nowrap rounded-lg px-3 py-1 text-sm font-semibold
            ${
              bubble.type === "say"
                ? "bg-white border border-gray-400 text-black"
                : "bg-yellow-100 border border-yellow-400 text-yellow-900 italic"
            }
          `}
          >
            {bubble.text}
          </div>
        )}
      </div>
    </>
  );
}


