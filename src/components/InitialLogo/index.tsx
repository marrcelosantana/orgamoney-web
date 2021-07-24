import styles from "./styles.module.scss";

export function InitialLogo() {
  // eslint-disable-next-line @next/next/no-img-element
  return <img src="images/logo.png" alt="logo" className={styles.logo} />;
}
