export const getDirection = (dx: number, dy: number) => {
  if (dx === 0 && dy === 0) return "nowhere";
  if (dx > 0) return dy > 0 ? "southeast" : dy < 0 ? "northeast" : "east";
  if (dx < 0) return dy > 0 ? "southwest" : dy < 0 ? "northwest" : "west";
  return dy > 0 ? "south" : "north";
};
