import { useRecoilState } from "recoil";
import { useRef } from "react";
import { calculatorDisplayState, calculatorMemoryState } from "../atom";

export const useCalculator = () => {
  const [display, setDisplay] = useRecoilState<string>(calculatorDisplayState);
  const [memory, setMemory] = useRecoilState<number>(calculatorMemoryState);

  const lastValueRef = useRef<number | null>(null);
  const lastOperatorRef = useRef<string | null>(null);
  const awaitingNextValue = useRef<boolean>(false);

  const calculate = (a: number, b: number, operator: string): number => {
    switch (operator) {
      case "+":
        return a + b;
      case "-":
        return a - b;
      case "*":
        return a * b;
      case "/":
        return b !== 0 ? a / b : NaN;
      default:
        return b;
    }
  };

  const handleClickCalculator = (value: string) => {
    if (display === "Error" && !["C", "CE"].includes(value)) return;

    switch (value) {
      case "C":
        setDisplay("0");
        lastValueRef.current = null;
        lastOperatorRef.current = null;
        awaitingNextValue.current = false;
        break;

      case "CE":
        setDisplay("0");
        break;

      case "Back":
        setDisplay((prev) => (prev.length > 1 ? prev.slice(0, -1) : "0"));
        break;

      case "=": {
        const a = lastValueRef.current;
        const b = parseFloat(display);
        const operator = lastOperatorRef.current;

        if (a !== null && operator && !isNaN(b) && isFinite(b)) {
          const result = calculate(a, b, operator);
          setDisplay(
            isNaN(result) || !isFinite(result) ? "Error" : result.toString()
          );
          lastValueRef.current = null;
          lastOperatorRef.current = null;
          awaitingNextValue.current = false;
        }
        break;
      }

      case "1/x": {
        const value = parseFloat(display);
        if (value === 0 || isNaN(value)) {
          setDisplay("Error");
        } else {
          setDisplay((1 / value).toString());
        }
        break;
      }

      case "sqrt": {
        const value = parseFloat(display);
        setDisplay(
          value < 0 || isNaN(value) ? "Error" : Math.sqrt(value).toString()
        );
        break;
      }

      case "+/-":
        setDisplay((prev) =>
          prev.startsWith("-") ? prev.slice(1) : `-${prev}`
        );
        break;

      case "MC":
        setMemory(0);
        break;

      case "MR":
        setDisplay(memory.toString());
        awaitingNextValue.current = true;
        break;

      case "MS":
        setMemory(parseFloat(display));
        break;

      case "M+":
        setMemory((prev) => prev + parseFloat(display));
        break;

      case "%": {
        const a = lastValueRef.current;
        const operator = lastOperatorRef.current;
        const b = parseFloat(display);

        if (a !== null && operator && !isNaN(b)) {
          let percentValue = 0;

          if (operator === "+" || operator === "-") {
            percentValue = (a * b) / 100;
          } else if (operator === "*" || operator === "/") {
            percentValue = b / 100;
          }

          setDisplay(percentValue.toString());
          awaitingNextValue.current = false;
        }
        break;
      }

      case "+":
      case "-":
      case "*":
      case "/": {
        if (!awaitingNextValue.current) {
          lastValueRef.current = parseFloat(display);
          lastOperatorRef.current = value;
          awaitingNextValue.current = true;
        } else {
          const a = lastValueRef.current;
          const b = parseFloat(display);
          const operator = lastOperatorRef.current;

          if (a !== null && operator && !isNaN(b)) {
            const result = calculate(a, b, operator);
            if (isNaN(result) || !isFinite(result)) {
              setDisplay("Error");
              lastValueRef.current = null;
              lastOperatorRef.current = null;
              awaitingNextValue.current = false;
            } else {
              setDisplay(result.toString());
              lastValueRef.current = result;
              lastOperatorRef.current = value;
              awaitingNextValue.current = true;
            }
          }
        }

        setDisplay("0");
        break;
      }

      case ".":
        setDisplay((prev) => {
          if (awaitingNextValue.current) {
            awaitingNextValue.current = false;
            return "0.";
          }

          return prev.includes(".") ? prev : prev + ".";
        });
        break;

      default:
        setDisplay((prev) => {
          if (awaitingNextValue.current) {
            awaitingNextValue.current = false;
            return value;
          }

          return prev === "0" || prev === "Error" ? value : prev + value;
        });
    }
  };

  return { display, handleClickCalculator, memory };
};
