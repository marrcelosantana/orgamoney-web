import Head from 'next/head';
import styles from './home.module.scss';

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

                  <button className = { styles.buttonConnect }>CONECTAR</button>

                  <div className = { styles.options }>
                    <a>Esqueceu a senha?</a>
                    <a>Cadastre-se</a>
                  </div>
                </form>
              </div>
          </div>
      </div>
      
    </>
  )
}