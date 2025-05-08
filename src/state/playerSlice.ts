import { create } from "zustand";
import { useMapStore } from "./mapSlice";
import { useMonsterStore } from "./monsterSlice.ts";
import { useGameStore } from "./gameSlice";
import { getDirection } from "../utils/getDirection";

interface PlayerState {
  x: number;
  y: number;
  move: (dx: number, dy: number) => void;
}

export const usePlayerStore = create<PlayerState>((set, get) => {
  const { isWalkable } = useMapStore.getState();

  const [x, y] = useMapStore.getState().spawn;
  return {
    x,
    y,
    move: (dx, dy) => {
      const { x, y } = get();
      const newX = x + dx;
      const newY = y + dy;

      if (isWalkable(newX, newY)) {
        set({ x: newX, y: newY });
        useMapStore.getState().updateVisibility(newX, newY);
        useMonsterStore.getState().tickMonsters(newX, newY);
        useGameStore.getState().logMessage(`You moved ${getDirection(dx, dy)}`);
      } else {
        useGameStore.getState().logMessage("You bump into a wall.");
      }
    },
  };
});
