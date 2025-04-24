import { create } from "zustand";
import { useMapStore } from "./mapSlice";

// Inside the store factory:
const [x, y] = useMapStore.getState().spawn;

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
      }
    },
  };
});
