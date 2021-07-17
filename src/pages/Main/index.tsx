import styles from "./styles.module.scss";
import Header from "../../components/Header";
import Head from "next/head";
import RegisterTransaction from "../../components/RegisterTransaction";
import Graphics from "../../components/Graphics";

export default function Main() {
  return (
    <>
      <Head>
        <title>Início | OrgaMoney</title>
      </Head>
      <div className={ styles.container }>
        <Header />
        <div className={ styles.content }>
          <div className={ styles.leftContent }>
            <div className = { styles.date }>
              <select name="year" id="year">
                <option value="1">2021</option>
                <option value="1">2020</option>
              </select>
              <select name="month" id="month">
                <option value="1">Fevereiro</option>
                <option value="1">Janeiro</option>
              </select>
            </div>
            <div className={ styles.registeredData }>
              <p>Componente Dados Registrados</p>
            </div>
          </div>
          <div className={ styles.rightContent }>
            <div className={ styles.registerTransaction }>
              <RegisterTransaction />
            </div>
            <div className = { styles.graphics }>
              <Graphics />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
