import styles from './styles.module.scss';
import Header from '../../components/Header';
import Head from "next/head";

export default function Main(){
  return(
    <>
      <Head>
        <title>Início | OrgaMoney</title>
      </Head>
      <div className={ styles.container }>
        <Header/>
        <p>Olá mundo</p>
      </div>
    </>
  );
}