import styles from "./Minesweeper.module.scss";
import useMinesweeper from "../../../state/hooks/useMinesweeper";

import flagIcon from "../../../assets/images/minesweeper/flag.png";
import mineIcon from "../../../assets/images/minesweeper/mine.png";

const Minesweeper = () => {
  const { state, handleClickMinesweeper, resetGame, toggleFlagMode } =
    useMinesweeper();

  return (
    <div className={styles.minesweeper}>
      <div className={styles.topBar}>
        <div className={styles.counter}>
          {state.flagsLeft.toString().padStart(3, "0")}
        </div>
        <div className={styles.flagToggle}>
          <button onClick={toggleFlagMode}>
            {state.flagMode ? "🚩ON" : "🕹️OFF"}
          </button>
        </div>
        <button className={styles.face} onClick={resetGame}>
          <img src={state.emoji} alt="reset" />
        </button>
        <div className={styles.counter}>
          {state.timer.toString().padStart(3, "0")}
        </div>
      </div>

      <div className={styles.board}>
        {state.board.map((row, y) => (
          <div key={y} className={styles.row}>
            {row.map((cell, x) => (
              <div
                key={x}
                className={`${styles.cell} ${
                  cell.isRevealed ? styles.revealed : ""
                }`}
                onClick={() => handleClickMinesweeper(x, y)}
              >
                {cell.isFlagged && !cell.isRevealed && (
                  <img src={flagIcon} alt="flag" />
                )}
                {cell.isRevealed && cell.isMine && (
                  <img src={mineIcon} alt="mine" />
                )}
                {cell.isRevealed && !cell.isMine && cell.adjacentMines > 0 && (
                  <span
                    className={`${styles.number} ${
                      styles[`n${cell.adjacentMines}`]
                    }`}
                  >
                    {cell.adjacentMines}
                  </span>
                )}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Minesweeper;
