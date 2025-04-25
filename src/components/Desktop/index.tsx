import styles from "./Desktop.module.scss";

import notePadImg from "../../assets/images/notepad.png";
import comandPromptImg from "../../assets/images/command_prompt.png";
import emailImg from "../../assets/images/email.png";
import internetImg from "../../assets/images/internet.png";

import AboutMe from "../IconsComponents/AboutMe";
import System from "../IconsComponents/System";
import Window from "../Window";

import useWindows from "../../state/hooks/useWindows";
import { Icon } from "../../interfaces";
import IconList from "../IconsList";

const Desktop = () => {
  const { openWindows, closeWindow, handleIconClick } = useWindows();

  const desktopIcons: Icon[] = [
    {
      iconTitle: "Sobre mim",
      iconImg: notePadImg,
      iconLabel: "Ícone do bloco de notas",
      shouldOpenWindow: true,
      iconContent: <AboutMe />,
    },
    {
      iconTitle: "Sistema",
      iconImg: comandPromptImg,
      iconLabel: "Ícone do prompt de comando",
      shouldOpenWindow: true,
      iconContent: <System />,
    },
    {
      iconTitle: "Email",
      iconImg: emailImg,
      iconLabel: "Ícone de email",
      shouldOpenWindow: false,
      iconUrl: "https://www.gmail.com",
    },
    {
      iconTitle: "Internet",
      iconImg: internetImg,
      iconLabel: "Ícone de internet",
      shouldOpenWindow: false,
      iconUrl: "https://www.google.com",
    },
  ];

  return (
    <>
      <IconList
        icons={desktopIcons}
        classNames={{
          list: styles.desktopIconList,
          button: styles.desktopIconButton,
          image: styles.desktopIconImg,
        }}
        onIconClick={handleIconClick}
      />

      {openWindows.map(({ title, content, iconImg, notMaximize }) => (
        <Window
          key={title}
          title={title}
          iconImg={iconImg || ""}
          notMaximize={notMaximize}
          closeWindow={() => closeWindow(title)}
        >
          {content}
        </Window>
      ))}
    </>
  );
};

export default Desktop;
