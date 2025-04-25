import { useRecoilState } from "recoil";
import { timeState } from "../atom";
import { useEffect } from "react";

const useCurrentTime = () => {
  const [time, setTime] = useRecoilState<string>(timeState);

  useEffect(() => {
    setInterval(() => {
      const currentTime = new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      });
      setTime(currentTime);
    }, 1000);
  });
  return time;
};

export default useCurrentTime;
