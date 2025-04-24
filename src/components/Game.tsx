import React, { useEffect, useRef } from "react";
import { Tile } from "./Tile";
import { usePlayerStore } from "../state/playerSlice";
import { useMapStore } from "../state/mapSlice";

const size = 32;

export const Game: React.FC = () => {
  const map = useMapStore((state) => state.map);
  const mapRef = useRef<HTMLDivElement>(null);
  const { x, y, move } = usePlayerStore();

  // Center camera on player after move
  useEffect(() => {
    const container = mapRef.current;
    if (container) {
      container.scrollTo({
        left: x * size - container.clientWidth / 2 + size / 2,
        top: y * size - container.clientHeight / 2 + size / 2,
        behavior: "smooth",
      });
    }
  }, [x, y]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key.toLowerCase()) {
        case "w":
          move(0, -1);
          break;
        case "a":
          move(-1, 0);
          break;
        case "s":
          move(0, 1);
          break;
        case "d":
          move(1, 0);
          break;
        case "r":
          useMapStore.getState().regenerate();
          break;
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [move]);

  return (
    <div
      ref={mapRef}
      className="relative w-[100vw] h-[100vh] bg-black overflow-auto"
    >
      {map.flatMap((row, y) =>
        row.split("").map((char, x) => {
          const type = char === "#" ? "wall" : "floor";
          return <Tile key={`${x},${y}`} x={x} y={y} type={type} />;
        }),
      )}

      <div
        className="absolute w-8 h-8 bg-yellow-400 z-10 flex items-center justify-center text-black font-bold"
        style={{
          left: `${x * size}px`,
          top: `${y * size}px`,
        }}
      >
        @
      </div>
    </div>
  );
};
