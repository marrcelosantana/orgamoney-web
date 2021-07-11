import Head from 'next/head';
import styles from './home.module.scss';
import { FiLogIn } from 'react-icons/fi';
import Link from 'next/link';

export default function Home() {
  return (
    <>
      <Head>
        <title>Login | OrgaMoney</title>
      </Head>
      <div className = { styles.container }>
          <div className = { styles.centerContainer }>
              <div className = { styles.logoArea }>
                <img src="images/logo.png" alt="logo" className = { styles.logo }/>
              </div>
              <div className = { styles.menuLogin }>
                <form className = { styles.form }>
                  <h3>LOGIN</h3>
                  <div className = { styles.inputs }>
                    <input type="email" placeholder="Email@address.com"/>
                    <input type="password" placeholder="Senha"/>
                  </div>
                  <button className = { styles.buttonConnect }>
                    <FiLogIn className={ styles.loginIcon }></FiLogIn>
                    CONECTAR
                  </button>
                  <div className = { styles.options }>
                    <Link href = "/Register">
                      <a>Cadastre-se agora!</a>
                    </Link>
                  </div>
                </form>
              </div>
          </div>
      </div>
    </>
  )
}