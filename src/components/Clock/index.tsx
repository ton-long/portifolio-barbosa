import style from "./Clock.module.scss";
import useCurrentTime from "../../state/hooks/useCurrentTime";

const Clock = () => {
  const time = useCurrentTime();
  return <div className={style.Clock}>{time}</div>;
};

export default Clock;
