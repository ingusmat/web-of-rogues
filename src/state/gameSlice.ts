import { create } from "zustand";

interface GameState {
  log: string[];
  logMessage: (message: string) => void;
  clearLog: () => void;
}

export const useGameStore = create<GameState>((set) => ({
  log: [],
  logMessage: (message: string) =>
    set((state) => ({
      log: [...state.log.slice(-4), message], // keep only last 5
    })),
  clearLog: () => set({ log: [] }),
}));
