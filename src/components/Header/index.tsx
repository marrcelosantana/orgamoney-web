import styles from './styles.module.scss';
import { CgLogOut } from 'react-icons/cg';
import router from 'next/router';
import Image from 'next/image';
import logoReduzida from '../../../public/images/reduzida.png';

export default function Header (){

  function handleLogout(){
    localStorage.clear();
    router.push('/');
  }

  return (
    <header>
      <div className = { styles.container }>
        <div className = { styles.logo }>
          <Image src={logoReduzida} alt="logo" />
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