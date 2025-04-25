import styles from "./TaskBarIcons.module.scss";
import useWindows from "../../state/hooks/useWindows";

const TaskBarIcons = () => {
  const { openWindows, toggleMinimize, getWindowState } = useWindows();

  const handleTabClick = (
    title: string,
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.stopPropagation();
    toggleMinimize(title);
  };

  return (
    <div className={styles.windowTabs}>
      {openWindows.map((window, index) => {
        const { isMinimized, isActive } = getWindowState(window.title);
        return (
          <button
            key={index}
            data-window-title={window.title}
            className={`${styles.windowTab} ${
              isMinimized ? styles.minimized : ""
            } ${isActive ? styles.active : ""}`}
            onClick={(e) => handleTabClick(window.title, e)}
          >
            <img src={window.iconImg} className={styles.iconImg} />
            {window.title}
            
          </button>
        );
      })}
    </div>
  );
};

export default TaskBarIcons;
