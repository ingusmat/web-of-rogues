import { create } from "zustand";
import { generateMap, findEmptyTile } from "../engine/map";

interface MapState {
  map: string[];
  spawn: [number, number];
  regenerate: () => void;
  isWalkable: (x: number, y: number) => boolean;
}

export const useMapStore = create<MapState>((set, get) => {
  const newMap = generateMap();
  const spawn = findEmptyTile(newMap);

  return {
    map: newMap,
    spawn,
    regenerate: () => {
      const newMap = generateMap();
      const newSpawn = findEmptyTile(newMap);
      set({ map: newMap, spawn: newSpawn });
    },
    isWalkable: (x, y) => {
      const tile = get().map[y]?.[x];
      return tile === ".";
    },
  };
});
