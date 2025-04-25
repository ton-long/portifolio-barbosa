import { useRecoilState } from "recoil";
import { WindowData } from "../../interfaces";
import {
  activeWindowTitleState,
  minimizedWindowsState,
  openWindowsState,
} from "../atom";

const useWindows = () => {
  const [openWindows, setOpenWindows] =
    useRecoilState<WindowData[]>(openWindowsState);
  const [minimizedWindows, setMinimizedWindows] = useRecoilState<string[]>(
    minimizedWindowsState
  );
  const [activeWindowTitle, setActiveWindowTitle] = useRecoilState<
    string | null
  >(activeWindowTitleState);

  const openWindow = (
    title: string,
    content: JSX.Element,
    iconImg: string,
    notMaximize?: boolean
  ) => {
    const isWindowOpen = openWindows.some((window) => window.title === title);
    if (isWindowOpen) {
      if (minimizedWindows.includes(title)) {
        setMinimizedWindows((prev) => prev.filter((t) => t !== title));
      }
      setActiveWindowTitle(title);
      return;
    }
    setOpenWindows((prev) => [
      ...prev,
      { title, content, iconImg, notMaximize },
    ]);
    setActiveWindowTitle(title);
  };

  const closeWindow = (title: string) => {
    setOpenWindows((prev) => prev.filter((w) => w.title !== title));
    setMinimizedWindows((prev) => prev.filter((t) => t !== title));
    if (activeWindowTitle === title) setActiveWindowTitle(null);
  };

  const toggleMinimize = (title: string) => {
    const isMinimized = minimizedWindows.includes(title);

    if (isMinimized) {
      setMinimizedWindows((prev) => prev.filter((t) => t !== title));
      setActiveWindowTitle(title);
    } else {
      setMinimizedWindows((prev) => [...prev, title]);
      if (activeWindowTitle === title) {
        setActiveWindowTitle(null);
      }
    }
  };

  const setActive = (title: string) => {
    setActiveWindowTitle(title);
  };

  const clearActive = (title: string) => {
    if (activeWindowTitle === title) setActiveWindowTitle(null);
  };

  const getWindowState = (title: string) => ({
    isMinimized: minimizedWindows.includes(title),
    isActive: activeWindowTitle === title,
  });

  const handleIconClick = (
    iconTitle: string,
    iconImg: string,
    shouldOpenWindow: boolean,
    iconContent?: JSX.Element,
    iconUrl?: string,
    notMaximize?: boolean
  ) => {
    if (shouldOpenWindow && iconContent) {
      openWindow(iconTitle, iconContent, iconImg, notMaximize);
    } else if (iconUrl) {
      openPage(iconUrl);
    }
  };

  const openPage = (iconUrl: string) => {
    window.open(iconUrl);
  };

  return {
    openWindows,
    openWindow,
    closeWindow,
    toggleMinimize,
    setActive,
    clearActive,
    getWindowState,
    handleIconClick,
    openPage,
  };
};

export default useWindows;
