import * as ROT from "rot-js";
import { MAP_WIDTH, MAP_HEIGHT } from "./map";

export function computeFOV(
  map: string[],
  isWalkable: (x: number, y: number) => boolean,
  playerX: number,
  playerY: number,
  radius: number,
) {
  const fov = new ROT.FOV.PreciseShadowcasting((x, y) => {
    return isWalkable(x, y) || map[y]?.[x] === "#";
  });

  const visibleTiles = new Set<string>();

  fov.compute(playerX, playerY, radius, (x, y) => {
    if (x >= 0 && y >= 0 && x < MAP_WIDTH && y < MAP_HEIGHT) {
      visibleTiles.add(`${x},${y}`);
    }
  });

  return visibleTiles;
}
