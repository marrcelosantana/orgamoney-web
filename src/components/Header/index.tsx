import styles from './styles.module.scss';
import { CgLogOut } from 'react-icons/cg';
import router from 'next/router';

export default function Header (){

  function handleLogout(){
    localStorage.clear();
    router.push('/');
  }

  return (
    <header>
      <div className = { styles.container }>
        <div className = { styles.logo }>
          <img src="images/reduzida.png" alt="logo" />
          <span>| Página Inicial</span>
        </div>
        <div className= { styles.options }>
          <a onClick = { handleLogout }>
            Sair
            <CgLogOut/>
          </a>
        </div>
      </div>
    </header>
  );
}