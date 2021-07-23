import Head from "next/head";
import styles from "./register.module.scss";
import { FiLogIn } from "react-icons/fi";
import { TiArrowBackOutline } from "react-icons/ti";
import Link from "next/link";
import toast from 'react-hot-toast';
import { useRouter } from "next/router";
import { InitialLogo } from "../../components/InitialLogo";
import api from '../../services/api';
import { FormEvent, useState } from "react";
import { Toaster } from 'react-hot-toast';
import User from '../../models/user';

export default function Register() {
  const [name, setName] = useState('');
  const [login, setLogin] = useState ('');
  const [password, setPassword] = useState ('');

  const router = useRouter();

  async function handleRegister(e: FormEvent){
    e.preventDefault();
    const data = {name, login, password};
    try{
      const response = await api.post<User>('/user', data);
      toast.success('Cadastro realizado com sucesso! 🤑',{
        duration: 2000,
      });
      setTimeout(()=>{ router.push('/') }, 2000);
    }catch(err){
      alert('Erro no cadastro, tente novamente!'+ err);
      
    }
  }

  return (
    <div className={ styles.register }>
      <Head>
        <title>Cadastro | OrgaMoney</title>
      </Head>
      <div className={ styles.centerContainer }>
      <Toaster/>
        <div className={ styles.logoArea }>
          <InitialLogo />
        </div>
        <div className={ styles.menuLogin }>
          <form className={ styles.form } onSubmit = { handleRegister }>
            <h3>CADASTRO</h3>
            <div className={ styles.inputs }>
              <input type="text" placeholder="Seu Nome"  value = { name } onChange = {e => setName(e.target.value)}/>
              <input type="email" placeholder="Email@address.com" value = { login } onChange = {e => setLogin(e.target.value)}/>
              <input type="password" placeholder="Senha" value = { password } onChange = {e => setPassword(e.target.value)}/>
            </div>
            <button className={ styles.buttonConnect } type="submit">
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
