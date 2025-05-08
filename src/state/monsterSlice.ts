import { create } from "zustand";
import { Monster } from "../types/entity";
import { useMapStore } from "./mapSlice";
import { v4 as uuidv4 } from "uuid";
import { useGameStore } from "./gameSlice";
import { getDirection } from "../utils/getDirection";

interface MonsterState {
  monsters: Monster[];
  spawnMonsters: (count: number) => void;
  tickMonsters: (playerX: number, playerY: number) => void;
}

const updateMonster = (
  m: Monster,
  playerX: number,
  playerY: number,
  visibleTiles: Set<string>,
  monsters: Monster[],
  isLogging = false,
): Monster => {
  const key = `${m.x},${m.y}`;
  const { isWalkable } = useMapStore.getState();
  if (!visibleTiles.has(key)) return m;

  const dx = Math.sign(playerX - m.x);
  const dy = Math.sign(playerY - m.y);
  const newX = m.x + dx;
  const newY = m.y + dy;

  const occupied = monsters.some(
    (other) => other.id !== m.id && other.x === newX && other.y === newY,
  );

  if (isWalkable(newX, newY) && !occupied) {
    if (isLogging) {
      useGameStore
        .getState()
        .logMessage(`The monster shuffles ${getDirection(dx, dy)}.`);
    }
    return { ...m, x: newX, y: newY };
  }

  return m;
};

export const useMonsterStore = create<MonsterState>((set, get) => ({
  monsters: [],
  spawnMonsters: (count) => {
    const map = useMapStore.getState().map;
    const floorTiles: [number, number][] = [];

    // Find all floor tiles
    map.forEach((row, y) => {
      row.split("").forEach((char, x) => {
        if (char === ".") floorTiles.push([x, y]);
      });
    });

    const monsters: Monster[] = [];
    for (let i = 0; i < count && floorTiles.length > 0; i++) {
      const index = Math.floor(Math.random() * floorTiles.length);
      const [x, y] = floorTiles.splice(index, 1)[0];
      monsters.push({ id: uuidv4(), x, y });
    }

    set({ monsters });
  },
  tickMonsters: (px: number, py: number) => {
    const { visibleTiles } = useMapStore.getState();
    const monsters = get().monsters;
    const updated = monsters.map((m) =>
      updateMonster(m, px, py, visibleTiles, monsters, true),
    );
    set({ monsters: updated });
  },
}));
