import { create } from "zustand";
import {
  generateMap,
  findEmptyTile,
  MAP_WIDTH,
  MAP_HEIGHT,
} from "../engine/map";
import { computeFOV } from "../engine/fov";

interface MapState {
  map: string[];
  spawn: [number, number];
  visibleTiles: Set<string>;
  exploredTiles: Set<string>;
  isWalkable: (x: number, y: number) => boolean;
  updateVisibility: (x: number, y: number) => void;
  regenerate: () => void;
}

export const useMapStore = create<MapState>((set, get) => {
  const newMap = generateMap();
  const spawn = findEmptyTile(newMap);
  const isWalkable = (x: number, y: number) => newMap[y]?.[x] === ".";

  const initialVisible = computeFOV(newMap, isWalkable, spawn[0], spawn[1], 5);
  const initialExplored = new Set(initialVisible);

  return {
    map: newMap,
    spawn,
    visibleTiles: initialVisible,
    exploredTiles: initialExplored,
    isWalkable: (x, y) => {
      const tile = get().map[y]?.[x];
      return tile === ".";
    },
    updateVisibility: (x, y) => {
      const map = get().map;
      const visible = computeFOV(map, isWalkable, x, y, 5);
      const explored = get().exploredTiles;
      visible.forEach((tile) => explored.add(tile));
      set({
        visibleTiles: visible,
        exploredTiles: new Set(explored),
      });
    },
    regenerate: () => {
      const newMap = generateMap();
      const newSpawn = findEmptyTile(newMap);
      const initialVisible = computeFOV(newSpawn[0], newSpawn[1], 5);
      const initialExplored = new Set(initialVisible);
      set({
        map: newMap,
        spawn: newSpawn,
        visibleTiles: initialVisible,
        exploredTiles: initialExplored,
      });
    },
  };
});
