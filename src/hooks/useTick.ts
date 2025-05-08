import { useEffect, useRef } from "react";

export function useTick(callback: () => void, fps: number = 10) {
  const frame = useRef<number>(0);
  const lastTime = useRef<number>(0);
  const interval = 1000 / fps;

  useEffect(() => {
    const tick = (time: number) => {
      if (time - lastTime.current >= interval) {
        lastTime.current = time;
        callback();
      }
      frame.current = requestAnimationFrame(tick);
    };

    frame.current = requestAnimationFrame(tick);
    return () => {
      if (frame.current) cancelAnimationFrame(frame.current);
    };
  }, [callback, fps]);
}
