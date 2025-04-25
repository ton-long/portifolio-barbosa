export interface Icon {
  iconTitle: string;
  iconImg: string;
  iconLabel: string;
  shouldOpenWindow: boolean;
  iconContent?: JSX.Element;
  iconUrl?: string;
  notMaximize?: boolean;
}

export interface WindowData {
  title: string;
  content: JSX.Element;
  iconImg?: string;
  notMaximize?: boolean;
}

export interface WindowInstanceState {
  position: { x: number; y: number };
  size: { width: number; height: number };
  isMaximized: boolean;
}

export interface WindowProps {
  title: string;
  iconImg: string;
  children: JSX.Element;
  closeWindow: () => void;
  notMaximize?: boolean;
}

export interface IconListProps {
  icons: Icon[];
  classNames: {
    list: string;
    button: string;
    image: string;
    itenList?: string;
  };
  onIconClick: (
    title: string,
    img: string,
    shouldOpen: boolean,
    content?: JSX.Element,
    url?: string,
    notMaximize?: boolean
  ) => void;
}

export interface Cell {
  isRevealed: boolean;
  isMine: boolean;
  isFlagged: boolean;
  adjacentMines: number;
}

export interface GameState {
  board: Cell[][];
  gameOver: boolean;
  timer: number;
  started: boolean;
  flagMode: boolean;
  flagsLeft: number;
  emoji: string;
}
