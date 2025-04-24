import * as ROT from "rot-js";

// Define map size
export const MAP_WIDTH = 80;
export const MAP_HEIGHT = 40;

export function generateMap(): string[] {
  const map: string[] = [];

  // Initialize blank map rows
  for (let y = 0; y < MAP_HEIGHT; y++) {
    map.push("".padEnd(MAP_WIDTH, "#"));
  }

  const digger = new ROT.Map.Digger(MAP_WIDTH, MAP_HEIGHT);
  const digCallback = (x: number, y: number, value: number) => {
    const row = map[y].split("");
    row[x] = value === 0 ? "." : "#"; // 0 = floor, 1 = wall
    map[y] = row.join("");
  };

  digger.create(digCallback);

  return map;
}

export function findEmptyTile(map: string[]): [number, number] {
  for (let y = 0; y < map.length; y++) {
    for (let x = 0; x < map[y].length; x++) {
      if (map[y][x] === ".") return [x, y];
    }
  }
  return [1, 1]; // Fallback (shouldn't happen)
}
