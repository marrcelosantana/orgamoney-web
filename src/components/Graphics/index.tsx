import styles from "./styles.module.scss";

export default function Graphics() {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <span>GRÁFICOS</span>
      </header>
      <div className={styles.graphic}>
        <p>MODELO DE GRÁFICO</p>
      </div>
    </div>
  );
}
