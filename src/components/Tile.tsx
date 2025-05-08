import React from "react";

type TileType = "floor" | "wall";

interface TileProps {
  type: TileType;
  x: number;
  y: number;
  visible: boolean;
  explored: boolean;
}

export const Tile: React.FC<TileProps> = ({
  type,
  x,
  y,
  visible,
  explored,
}) => {
  const size = 32;

  // Base background color
  const baseColor = type === "wall" ? "bg-gray-400" : "bg-gray-700";

  // Opacity class based on visibility
  const opacityClass = visible
    ? "opacity-100"
    : explored
      ? "opacity-30"
      : "opacity-0";

  return (
    <div
      className={`absolute ${baseColor} ${opacityClass} transition-opacity duration-200`}
      style={{
        left: `${x * size}px`,
        top: `${y * size}px`,
        width: `${size}px`,
        height: `${size}px`,
      }}
    />
  );
};
