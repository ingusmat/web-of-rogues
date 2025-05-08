import React, { useEffect, useRef } from "react";
import { Tile } from "./Tile";
import { useTick } from "../hooks/useTick";
import { usePlayerStore } from "../state/playerSlice";
import { useMonsterStore } from "../state/monsterSlice";
import { useMapStore } from "../state/mapSlice";
import { Monster } from "../types/entity";
import { HUD } from "./HUD";

const size = 32;

export const Game: React.FC = () => {
  const map = useMapStore((state) => state.map);
  const mapRef = useRef<HTMLDivElement>(null);
  const { x: playerX, y: playerY, move } = usePlayerStore();
  const { monsters } = useMonsterStore();
  const { visibleTiles, exploredTiles } = useMapStore();

  // Center camera on player after move
  useEffect(() => {
    const container = mapRef.current;
    if (container) {
      container.scrollTo({
        left: playerX * size - container.clientWidth / 2 + size / 2,
        top: playerY * size - container.clientHeight / 2 + size / 2,
        behavior: "smooth",
      });
    }
  }, [playerX, playerY]);

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

  useEffect(() => {
    useMonsterStore.getState().spawnMonsters(5);
  }, []);

  useTick(() => {
    // example: auto-log every tick
    useMonsterStore.getState().tickMonsters(playerX, playerY);
  }, 1); // runs at 1 FPS for testing (10–30 is typical)

  return (
    <>
      <div
        ref={mapRef}
        className="absolute top-[30px] left-0 right-0 bottom-[150px] bg-black overflow-auto"
      >
        {map.flatMap((row, y) =>
          row.split("").map((char, x) => {
            const type = char === "#" ? "wall" : "floor";
            const visible = visibleTiles.has(`${x},${y}`);
            const explored = exploredTiles.has(`${x},${y}`);
            return (
              <Tile
                key={`${x},${y}`}
                x={x}
                y={y}
                type={type}
                visible={visible}
                explored={explored}
              />
            );
          }),
        )}
        {monsters.map((monster: Monster) => {
          const visible = visibleTiles.has(`${monster.x},${monster.y}`);
          return (
            visible && (
              <div
                key={monster.id}
                className="absolute w-8 h-8 bg-red-600 z-10 flex items-center justify-center text-white font-bold"
                style={{
                  left: `${monster.x * size}px`,
                  top: `${monster.y * size}px`,
                }}
              >
                M
              </div>
            )
          );
        })}
        <div
          className="absolute w-8 h-8 bg-yellow-400 z-10 flex items-center justify-center text-black font-bold"
          style={{
            left: `${playerX * size}px`,
            top: `${playerY * size}px`,
          }}
        >
          @
        </div>
      </div>
      <HUD />
    </>
  );
};
