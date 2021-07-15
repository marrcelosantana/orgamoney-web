import styles from './styles.module.scss';
import { CgLogOut } from 'react-icons/cg';

export default function Header (){
  return (
    <header>
      <div className = { styles.container }>
        <div className = { styles.logo }>
          <img src="images/reduzida.png" alt="logo" />
          <span>| Página Inicial</span>
        </div>
        <div className= { styles.options }>
          <a href="/">
            Sair
            <CgLogOut/>
          </a>
        </div>
      </div>
    </header>
  );
}