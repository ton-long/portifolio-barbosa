import styles from "./System.module.scss";

const System = () => {
  return (
    <div className={styles.mainSystem}>
      <h1>C:\&gt; SOBRE O SISTEMA.</h1>
      <p>
        &gt; Site portifólio com design retrô baseado em um sistema operacional
        de 1995.
      </p>
      <p>
        &gt; Para melhor experiência do usuário, é aconselhável que esse site
        seja aberto em um computador.
      </p>
      <p>
        &gt; As janelas e a barra de menu simulam funcionalidades de um sistema
        operacional clássico.
      </p>
      <p>&gt; Botão Iniciar e todos os ícones funcionais.</p>
      <p>
        &gt; Possui aplicações como Campo Minado e Calculadora, com
        comportamentos semelhantes às da época.
      </p>
      <p>&gt; Você encontrará meu LinkedIn e GitHub no menu Iniciar.</p>
      <p>
        &gt; Tecnologias usadas: Vite, React, TypeScript, Recoil, react-rnd.
      </p>
      <p className={styles.pSystem}>Espero que gostem!!</p>
    </div>
  );
};

export default System;
