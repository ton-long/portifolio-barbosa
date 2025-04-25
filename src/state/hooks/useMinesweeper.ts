import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { gameState } from "../atom";
import {
  generateBoard,
  revealCell,
  checkWin,
  MINES,
} from "../../utils/minesweeperUtils";

import smileyFace from "../../assets/images/minesweeper/smile.png";
import deadIcon from "../../assets/images/minesweeper/dead.png";
import winnerIcon from "../../assets/images/minesweeper/winner.png";

const useMinesweeper = () => {
  const [state, setState] = useRecoilState(gameState);

  useEffect(() => {
    setState((prev) => ({ ...prev, board: generateBoard() }));
  }, []);

  useEffect(() => {
    if (!state.started || state.gameOver || state.emoji === winnerIcon) return;
    const interval = setInterval(() => {
      setState((prev) => ({ ...prev, timer: prev.timer + 1 }));
    }, 1000);
    return () => clearInterval(interval);
  }, [state.started, state.gameOver, state.emoji]);

  const handleClickMinesweeper = (x: number, y: number) => {
    if (state.gameOver || state.emoji === winnerIcon) return;

    const newBoard = state.board.map((row) => row.map((cell) => ({ ...cell })));
    const cell = newBoard[y][x];

    if (!state.started) {
      setState((prev) => ({ ...prev, started: true }));
    }

    if (state.flagMode) {
      if (!cell.isRevealed) {
        if (!cell.isFlagged && state.flagsLeft === 0) return;
        cell.isFlagged = !cell.isFlagged;
        const newFlagsLeft = state.flagsLeft + (cell.isFlagged ? -1 : 1);
        setState((prev) => ({
          ...prev,
          board: newBoard,
          flagsLeft: newFlagsLeft,
        }));
      }
    } else {
      if (cell.isFlagged || cell.isRevealed) return;
      if (cell.isMine) {
        cell.isRevealed = true;
        setState((prev) => ({
          ...prev,
          board: newBoard,
          gameOver: true,
          emoji: deadIcon,
        }));
        return;
      } else {
        revealCell(x, y, newBoard);
      }
    }

    let emoji = state.emoji;
    if (checkWin(newBoard)) emoji = winnerIcon;

    setState((prev) => ({ ...prev, board: newBoard, emoji }));
  };

  const toggleFlagMode = () => {
    setState((prev) => ({ ...prev, flagMode: !prev.flagMode }));
  };

  const resetGame = () => {
    setState({
      board: generateBoard(),
      gameOver: false,
      started: false,
      timer: 0,
      flagMode: false,
      flagsLeft: MINES,
      emoji: smileyFace,
    });
  };

  return {
    state,
    handleClickMinesweeper,
    toggleFlagMode,
    resetGame,
  };
};

export default useMinesweeper;
