import styles from "./styles.module.scss";
import Header from "../../components/Header";
import Head from "next/head";
import RegisterTransaction from "../../components/RegisterTransaction";
import Graphics from "../../components/Graphics";
import RegisteredData from "../../components/RegisteredData";
import { useEffect } from "react";
import { useUserContext } from "../../contexts/UserContext";

export default function Main() {
  const { verifyCookiesAndSetUser } = useUserContext();

  useEffect(() => {
    verifyCookiesAndSetUser();
  }, []);

  return (
    <>
      <Head>
        <title>Início | OrgaMoney</title>
      </Head>
      <div className={styles.container}>
        <Header />
        <div className={styles.content}>
          <div className={styles.leftContent}>
            <div className={styles.registeredData}>
              <RegisteredData />
            </div>
          </div>
          <div className={styles.rightContent}>
            <div className={styles.registerTransaction}>
              <RegisterTransaction />
            </div>
            <div className={styles.graphics}>
              <Graphics />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
