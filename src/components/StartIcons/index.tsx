import styles from "./StartIcons.module.scss";

import linkedinLogo from "../../assets/images/linkedin_logo.png";
import githubLogo from "../../assets/images/github_logo.png";
import calculatorImg from "../../assets/images/calculator.png";
import minesweeperImg from "../../assets/images/minesweeper.png";

import useWindows from "../../state/hooks/useWindows";
import { Icon } from "../../interfaces";

import IconList from "../IconsList";
import Calculator from "../IconsComponents/Calculator";
import Minesweeper from "../IconsComponents/Minesweeper";

const StartIcons = () => {
  const { handleIconClick } = useWindows();

  const startIcons: Icon[] = [
    {
      iconTitle: "Campo minado",
      iconImg: minesweeperImg,
      iconLabel: "Campo minado",
      shouldOpenWindow: true,
      iconContent: <Minesweeper />,
      notMaximize: true,
    },
    {
      iconTitle: "Calculadora",
      iconImg: calculatorImg,
      iconLabel: "Calculadora",
      shouldOpenWindow: true,
      iconContent: <Calculator />,
      notMaximize: true,
    },
    {
      iconTitle: "Linkedin",
      iconImg: linkedinLogo,
      iconLabel: "Logo do Linkedin",
      shouldOpenWindow: false,
      iconUrl: "https://www.linkedin.com/in/barbosa-programmer/",
    },
    {
      iconTitle: "GitHub",
      iconImg: githubLogo,
      iconLabel: "Logo do GitHub",
      shouldOpenWindow: false,
      iconUrl: "https://github.com/ton-long",
    },
  ];

  return (
    <div className={styles.startMenuWrapper}>
      <div className={styles.verticalText}>Portifólio 95</div>
      <IconList
        icons={startIcons}
        classNames={{
          list: styles.startList,
          itenList: styles.startItenList,
          button: styles.startIcons,
          image: styles.startIconImg,
        }}
        onIconClick={handleIconClick}
      />
    </div>
  );
};

export default StartIcons;
