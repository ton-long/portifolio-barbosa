import Clock from "../Clock";
import Start from "../Start";
import TaskBarIcons from "../TaskBarIcons";
import styles from "./TaskBar.module.scss";

const TaskBar = () => {
  return (
    <div className={styles.taskBar}>
      <div className={styles.leftSection}>
        <Start />
        <TaskBarIcons />
      </div>
      <Clock />
    </div>
  );
};

export default TaskBar;
