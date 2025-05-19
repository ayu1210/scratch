import React, { useEffect, useRef, useState } from "react";

export default function Sprite({ id, commands, color = "orange", startX = 0 }) {
  const spriteRef = useRef();
  const otherSpriteRef = useRef();
  const [pos, setPos] = useState({ x: startX, y: 20 });
  const [currentColor, setCurrentColor] = useState(color);

  // Swap colors on collision
  const swapColors = (newColor) => {
    setCurrentColor(newColor);
    setTimeout(() => setCurrentColor(color), 500);
  };

  useEffect(() => {
    let x = startX;
    let y = 20;
    let isCancelled = false;

    const run = async () => {
      for (const cmd of commands) {
        if (isCancelled) break;

        if (cmd.type === "move") {
          x += cmd.value; // value can be negative (left) or positive (right)

          // Clamp inside container (0 to 280 px width approx)
          if (x < 0) x = 0;
          if (x > 280) x = 280;
        } else if (cmd.type === "turn") {
          // You can implement rotation if you want
        } else if (cmd.type === "say") {
          alert(cmd.value);
        }

        setPos({ x, y });

        await new Promise((r) => setTimeout(r, 500));
      }
    };

    run();

    return () => {
      isCancelled = true;
    };
  }, [commands, startX, color]);

  return (
    <div
      ref={spriteRef}
      style={{
        position: "absolute",
        left: pos.x,
        top: pos.y,
        width: 60,
        height: 60,
        backgroundColor: currentColor,
        borderRadius: "50%",
        color: "white",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontSize: 30,
        userSelect: "none",
        transition: "left 0.3s ease, background-color 0.3s ease",
      }}
    >
      🐱
    </div>
  );
}
