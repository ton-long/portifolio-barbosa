import styles from "./AboutMe.module.scss";

const AboutMe = () => {
  return (
    <div className={styles.mainAboutMe}>
      <hr className={styles.hrTitle} />
      <h1 className={styles.aboutMeTitle}>Olá, me chamo Luã!</h1>
      <hr className={styles.hrTitle} />
      <p className={styles.aboutMeP}>
        Sempre tive uma paixão por tecnologia e programação, mas foi durante a
        pandemia que decidi seguir esse caminho de forma mais séria. A ideia de
        migrar para a área começou a tomar forma, e foi quando comecei a estudar
        por conta própria, dedicando meu tempo a aprender e aprimorar minhas
        habilidades.
      </p>
      <hr className={styles.hr} />
      <p className={styles.aboutMeP}>
        Inicialmente, foi um desafio, mas com o tempo, a programação passou a me
        fascinar cada vez mais. A sensação de resolver problemas e criar
        soluções me trouxe mais próximo da área. Com o tempo, resolvi me
        aprofundar ainda mais e investi em diversos cursos, que me permitiram
        melhorar meus conhecimentos e me tornar um desenvolvedor melhor.
      </p>
      <hr className={styles.hr} />
      <p className={styles.aboutMeP}>
        Hoje, a programação é algo que me encanta a cada novo projeto, e estou
        sempre em busca de novos aprendizados e desafios. Estou pronto para
        aplicar tudo o que aprendi em projetos reais e continuar crescendo na
        carreira de desenvolvedor.
      </p>
    </div>
  );
};

export default AboutMe;
