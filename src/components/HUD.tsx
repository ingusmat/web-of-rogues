// src/components/HUD.tsx
import React from "react";
import { useGameStore } from "../state/gameSlice";

export const HUD: React.FC = () => {
  const { log } = useGameStore();

  return (
    <div className="fixed bottom-0 left-0 w-full h-[150px] bg-gray-900 text-gray-200 px-4 py-2 font-mono border-t border-gray-700">
      <div className="flex justify-between items-start h-full">
        {/* Left: stats */}
        <div>
          <div>HP: 12 / 20</div>
          <div>Level: 1</div>
        </div>

        {/* Right: log */}
        <div className="text-right w-2/3 whitespace-pre-wrap text-sm leading-tight">
          {log.map((entry, idx) => (
            <div key={idx} className="text-gray-300 truncate">
              {entry}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
