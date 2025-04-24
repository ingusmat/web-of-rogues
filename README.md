# 🕸️ Web of Rogues

A browser-based roguelike built with modern web tech — think _Zelda 1_ meets _Nethack_, but with TypeScript and Tailwind instead of C and curses.

---

## 🚀 Tech Stack

- **React** + **Vite** for blazing-fast dev + modular components
- **Zustand** for state management (player, map, etc.)
- **Tailwind CSS** for layout and utility styling
- **ROT.js** for dungeon generation and field of view
- **TypeScript** for strictness and future-proofing
- **Ladle** for interactive component development

---

## 🧱 Features So Far

- ✅ Procedurally generated dungeons using ROT.js
- ✅ Div-based tile map using Tailwind classes for styling
- ✅ Smooth camera that follows the player
- ✅ WASD movement
- ✅ Player spawns in a valid floor tile
- ✅ Collision detection (no walking through walls)

---

## 🎯 Goals

- Top-down, real-time roguelike with infinite procedural levels
- Classic fog-of-war and field-of-view mechanics
- Monsters on predictable rails (think _Pac-Man_ meets _Cult of the Lamb_)
- Simple ability system (`j`, `k`, `l`, `;`)
- Items and pickups
- Infinite dungeon descent via stairs, increasing difficulty

---

## 💡 Design Philosophy

- SUPER modular — everything is built to be extended and modified
- All logic stays in client memory — no garbage collection from rerenders
- Not a commercial game — a playground to show off web dev skills and creative architecture

---

## 🛠️ Development

To start the dev server:

```
npm install
npm run dev
```

To preview story components in isolation with Ladle:

```
npm run ladle
```

📁 Project Structure
src/
components/ # React UI components (tiles, HUD, etc.)
engine/ # Map generation, fog of war, utilities
state/ # Zustand stores
types/ # Shared TypeScript types
utils/ # Coordinate helpers, math, etc.

🧪 Next Up

- Fog of war (FOV + memory)
- Stairs + level generation
- Simple enemies
- Abilities
- Inventory system

🧙 Author
Made by Ingus Mat Burleson — building Web of Rogues and other projects at github.com/ingusmat
