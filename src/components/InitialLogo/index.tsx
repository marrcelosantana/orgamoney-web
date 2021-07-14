import styles from './styles.module.scss';

export function InitialLogo(){
  return(
    <img src="images/logo.png" alt="logo" className = { styles.logo }/>
  );
}