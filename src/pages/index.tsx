import Head from "next/head";
import styles from "./home.module.scss";
import { FiLogIn } from "react-icons/fi";
import Link from "next/link";
import { InitialLogo } from "../components/InitialLogo";
import api from "../services/api";
import { FormEvent, useState } from "react";
import { Toaster } from "react-hot-toast";
import { useRouter } from "next/router";
import toast from "react-hot-toast";
import { useUserContext } from "../contexts/UserContext";

export default function Home() {
  const { handleSetAuthorization } = useUserContext();
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  async function handleLogin(e: FormEvent) {
    e.preventDefault();
    try {
      const response = await api.post("/user/session", { login, password });
      handleSetAuthorization(response.data);
      router.push("/main");
    } catch (err) {
      toast.error("Falha no login, tente novamente!");
    }
  }

  return (
    <>
      <Head>
        <title>Login | OrgaMoney</title>
      </Head>
      <Toaster />
      <div className={styles.container}>
        <div className={styles.centerContainer}>
          <div className={styles.logoArea}>
            <InitialLogo />
          </div>
          <div className={styles.menuLogin}>
            <form className={styles.form} onSubmit={handleLogin}>
              <h3>LOGIN</h3>
              <div className={styles.inputs}>
                <input
                  type="text"
                  placeholder="Email@address.com"
                  value={login}
                  onChange={(e) => setLogin(e.target.value)}
                />
                <input
                  type="password"
                  placeholder="Senha"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <button className={styles.buttonConnect} type="submit">
                <FiLogIn className={styles.loginIcon}></FiLogIn>
                CONECTAR
              </button>
              <div className={styles.options}>
                <Link href="/register">
                  <a>Cadastre-se agora!</a>
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
