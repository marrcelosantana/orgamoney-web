import Head from "next/head";
import styles from "./register.module.scss";
import { FiLogIn } from "react-icons/fi";
import { TiArrowBackOutline } from "react-icons/ti";
import Link from "next/link";

export default function Register() {
  return (
    <div className={ styles.register }>
      <Head>
        <title>Cadastro | OrgaMoney</title>
      </Head>
      <div className={ styles.centerContainer }>
        <div className={ styles.logoArea }>
          <img src="images/logo.png" alt="logo" className={ styles.logo } />
        </div>
        <div className={ styles.menuLogin }>
          <form className={ styles.form }>
            <h3>CADASTRO</h3>
            <div className={styles.inputs}>
              <input type="text" placeholder="Seu Nome" />
              <input type="email" placeholder="Email@address.com" />
              <input type="password" placeholder="Senha" />
            </div>
            <button className={ styles.buttonConnect }>
              <FiLogIn className={ styles.loginIcon }></FiLogIn>
              CADASTRAR
            </button>
            <div className={ styles.options }>
              <Link href="/">
                <a>
                  <TiArrowBackOutline
                    className={ styles.backIcon }></TiArrowBackOutline>
                    Voltar para Login
                </a>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
