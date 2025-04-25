import styles from "./Window.module.scss";

import { useEffect, useState } from "react";
import { Rnd } from "react-rnd";

import useWindows from "../../state/hooks/useWindows";
import useWindowInstance from "../../state/hooks/useWindowInstance";
import { WindowProps } from "../../interfaces";

const Window = ({
  title,
  iconImg,
  children,
  closeWindow,
  notMaximize = false,
}: WindowProps) => {
  const { toggleMinimize, setActive, clearActive, getWindowState } =
    useWindows();
  const { isMinimized, isActive } = getWindowState(title);
  const {
    position,
    size,
    isMaximized,
    setPosition,
    setSize,
    setMaximized,
    resetWindowInstance,
  } = useWindowInstance(title);

  const [maxSize, setMaxSize] = useState({ width: 0, height: 0 });

  const handleClose = () => {
    resetWindowInstance();
    closeWindow();
  };

  useEffect(() => {
    const updateSize = () => {
      setMaxSize({
        width: window.innerWidth,
        height: window.innerHeight - 28,
      });
    };

    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const windowElement = document.getElementById(`window-${title}`);
      const taskbarButton = document.querySelector(
        `[data-window-title="${title}"]`
      );

      if (
        windowElement &&
        !windowElement.contains(e.target as Node) &&
        !taskbarButton?.contains(e.target as Node)
      ) {
        clearActive(title);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [title]);

  if (isMinimized) return null;

  return (
    <Rnd
      id={`window-${title}`}
      position={isMaximized ? { x: 0, y: 0 } : position}
      size={
        isMaximized
          ? maxSize
          : notMaximize === true
          ? { width: 300, height: 285 }
          : size
      }
      minWidth={300}
      minHeight={250}
      maxWidth={maxSize.width}
      maxHeight={maxSize.height}
      bounds="window"
      enableResizing={!notMaximize && !isMaximized}
      disableDragging={isMaximized}
      dragHandleClassName={styles.titleBar}
      className={`${styles.window} ${isActive ? styles.active : ""}`}
      style={{ zIndex: isActive ? 10 : 1 }}
      onMouseDown={(e) => {
        e.stopPropagation();
        setActive(title);
      }}
      onDragStop={(_, d) => setPosition({ x: d.x, y: d.y })}
      onResizeStop={(_, __, ref, ___, newPosition) => {
        setSize({ width: ref.offsetWidth, height: ref.offsetHeight });
        setPosition(newPosition);
      }}
    >
      <div
        className={`${styles.titleBar} ${
          isActive ? styles.active : styles.inactive
        }`}
      >
        <span className={styles.title}>
          <img
            src={iconImg}
            alt="Ícone da janela"
            className={styles.windowIcon}
          />
          {title}
        </span>
        <div className={styles.windowButtons}>
          <button
            onClick={() => toggleMinimize(title)}
            className={styles.windowButton}
          >
            -
          </button>
          <button
            disabled={notMaximize}
            onClick={() => setMaximized(!isMaximized)}
            className={styles.windowButton}
          >
            {isMaximized ? "❐" : "□"}
          </button>
          <button
            onClick={handleClose}
            className={`${styles.windowButton} ${styles.closeButton}`}
          >
            ×
          </button>
        </div>
      </div>
      <div
        className={` ${
          notMaximize === true ? styles.content_calculator : styles.content
        }`}
      >
        {children}
      </div>
    </Rnd>
  );
};

export default Window;
