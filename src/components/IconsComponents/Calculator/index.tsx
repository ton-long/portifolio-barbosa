import styles from "./Calculator.module.scss";
import { useCalculator } from "../../../state/hooks/useCalculator";

const Calculator = () => {
  const { display, handleClickCalculator, memory } = useCalculator();

  const buttonsCalculator = [
    ["Back", "CE", "C"],
    ["MC", "7", "8", "9", "/", "sqrt"],
    ["MR", "4", "5", "6", "*", "%"],
    ["MS", "1", "2", "3", "-", "1/x"],
    ["M+", "0", "+/-", ".", "+", "="],
  ];

  return (
    <div className={styles.calculator}>
      <div className={styles.displayWrapper}>
        {memory !== 0 && <span className={styles.memoryIndicator}>M</span>}
        <input
          className={styles.display}
          type="text"
          value={display}
          readOnly
        />
      </div>
      <div className={styles.buttonContainer}>
        {buttonsCalculator.map((row, i) => (
          <div className={styles.row} key={i}>
            {row.map((btn) => (
              <button
                key={btn}
                className={`${styles.buttonsCalculator} ${
                  ["MC", "MR", "MS", "M+", "Back", "CE", "C"].includes(btn)
                    ? styles.memory
                    : /^[\/*\-+=%]$/.test(btn) || ["sqrt", "1/x"].includes(btn)
                    ? styles.operator
                    : ""
                }`}
                onClick={() => handleClickCalculator(btn)}
              >
                {btn}
              </button>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Calculator;
