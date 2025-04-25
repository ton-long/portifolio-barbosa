import { atom, atomFamily } from "recoil";
import { GameState, WindowData, WindowInstanceState } from "../interfaces";
import smileyFace from "../assets/images/minesweeper/smile.png";

export const timeState = atom<string>({
  key: "timeState",
  default: "0:00 AM",
});

export const activeWindowTitleState = atom<string | null>({
  key: "activeWindowTitleState",
  default: null,
});

export const openWindowsState = atom<WindowData[]>({
  key: "openWindowsState",
  default: [],
});

export const minimizedWindowsState = atom<string[]>({
  key: "minimizedWindowsState",
  default: [],
});

export const windowInstanceState = atomFamily<WindowInstanceState, string>({
  key: "windowInstanceState",
  default: () => ({
    position: { x: window.innerWidth <= 768 ? 0 : 100, y: 90 },
    size: { width: 700, height: 650 },
    isMaximized: false,
  }),
});

export const calculatorDisplayState = atom<string>({
  key: "calculatorDisplayState",
  default: "0",
});

export const calculatorMemoryState = atom<number>({
  key: "calculatorMemoryState",
  default: 0,
});

export const gameState = atom<GameState>({
  key: "gameState",
  default: {
    board: [],
    gameOver: false,
    timer: 0,
    started: false,
    flagMode: false,
    flagsLeft: 10,
    emoji: smileyFace,
  },
});
