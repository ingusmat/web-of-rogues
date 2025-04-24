import React from "react";
import clsx from "clsx";

type TileType = "floor" | "wall" | "fog";

interface TileProps {
  type: TileType;
  x: number;
  y: number;
}

export const Tile: React.FC<TileProps> = ({ type, x, y }) => {
  const size = 32;

  return (
    <div
      className={clsx(
        "absolute",
        type === "floor" && "bg-gray-700",
        type === "wall" && "bg-gray-400",
        type === "fog" && "bg-gray-900",
      )}
      style={{
        left: `${x * size}px`,
        top: `${y * size}px`,
        width: `${size}px`,
        height: `${size}px`,
      }}
    />
  );
};
