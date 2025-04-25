import { useRecoilState, useResetRecoilState } from "recoil";
import { windowInstanceState } from './../atom';
import { WindowInstanceState } from '../../interfaces';

const useWindowInstance = (title: string) => {
  const [state, setState] = useRecoilState<WindowInstanceState>(windowInstanceState(title));
  const reset = useResetRecoilState(windowInstanceState(title));

  const setPosition = (position: { x: number; y: number }) =>
    setState((prev) => ({ ...prev, position }));

  const setSize = (size: { width: number; height: number }) =>
    setState((prev) => ({ ...prev, size }));

  const setMaximized = (isMaximized: boolean) =>
    setState((prev) => ({ ...prev, isMaximized }));

  const resetWindowInstance = () => reset();

  return {
    ...state,
    setPosition,
    setSize,
    setMaximized,
    resetWindowInstance,
  };
};

export default useWindowInstance;
