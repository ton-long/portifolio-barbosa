import { Cell } from "../interfaces";

const WIDTH = 9;
const HEIGHT = 9;
export const MINES = 10;

export const generateBoard = (): Cell[][] => {
  const board: Cell[][] = Array.from({ length: HEIGHT }, () =>
    Array.from({ length: WIDTH }, () => ({
      isRevealed: false,
      isMine: false,
      isFlagged: false,
      adjacentMines: 0,
    }))
  );

  let minesPlaced = 0;
  while (minesPlaced < MINES) {
    const x = Math.floor(Math.random() * WIDTH);
    const y = Math.floor(Math.random() * HEIGHT);
    if (!board[y][x].isMine) {
      board[y][x].isMine = true;
      minesPlaced++;
    }
  }

  for (let y = 0; y < HEIGHT; y++) {
    for (let x = 0; x < WIDTH; x++) {
      if (!board[y][x].isMine) {
        let count = 0;
        for (let i = -1; i <= 1; i++) {
          for (let j = -1; j <= 1; j++) {
            const ny = y + i;
            const nx = x + j;
            if (
              ny >= 0 &&
              ny < HEIGHT &&
              nx >= 0 &&
              nx < WIDTH &&
              board[ny][nx].isMine
            ) {
              count++;
            }
          }
        }
        board[y][x].adjacentMines = count;
      }
    }
  }

  return board;
};

export const revealCell = (x: number, y: number, boardCopy: Cell[][]) => {
  const cell = boardCopy[y][x];
  if (cell.isRevealed || cell.isFlagged) return;
  cell.isRevealed = true;
  if (cell.adjacentMines === 0 && !cell.isMine) {
    for (let i = -1; i <= 1; i++) {
      for (let j = -1; j <= 1; j++) {
        const ny = y + i;
        const nx = x + j;
        if (
          ny >= 0 &&
          ny < boardCopy.length &&
          nx >= 0 &&
          nx < boardCopy[0].length
        ) {
          revealCell(nx, ny, boardCopy);
        }
      }
    }
  }
};

export const checkWin = (board: Cell[][]) => {
  return board.every((row) =>
    row.every((cell) => (cell.isMine ? true : cell.isRevealed))
  );
};
