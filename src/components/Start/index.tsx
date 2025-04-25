import styles from "./Start.module.scss";

import { useEffect, useState } from "react";

import startLogo from "../../assets/images/logo.png";
import StartIcons from "../StartIcons";

const Start = () => {
  const [isClicked, setIsClicked] = useState<boolean>(false);

  const handleClickStart = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsClicked(!isClicked);
  };

  const handleDocumentClick = () => {
    setIsClicked(false);
  };

  useEffect(() => {
    document.addEventListener("click", handleDocumentClick);

    return () => {
      document.removeEventListener("click", handleDocumentClick);
    };
  }, []);

  return (
    <div>
      <button
        className={`${styles.start} 
      ${isClicked ? styles.clicked : ""}`}
        onClick={handleClickStart}
      >
        <div className={styles.logo}>
          <img src={startLogo} alt="Logo do site" />
        </div>
        Iniciar
      </button>
      <div className={`${styles.startMenu} ${isClicked ? styles.open : ""}`}>
        <StartIcons />
      </div>
    </div>
  );
};

export default Start;
