import styles from "./styles.module.scss";
import { FormEvent, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FiCheckCircle } from "react-icons/fi";
import api from "../../services/api";
import User from "../../models/user";
import { useUserContext } from "../../contexts/UserContext";
import Category from "../../models/category";
import Cookies from "js-cookie";

//falta listar as categorias no select
//Os botões de entrada e saída agora são inputs do tipo Radio, fica melhor pra receber os dados.
//Função de listar categorias em comentário pois a rota ainda não está correta.
//Apagar a parte dos antigos botões comentadas se aprovar.

export default function RegisterTransaction() {
  const [name, setName] = useState("");
  const [value, setValue] = useState(0);
  const [idCategory, setCategory] = useState("");
  const [date, setDate] = useState("");
  const [idMonth, setMonth] = useState("Abril");
  const [typePayment, setTypePayment] = useState("");

  const [categories, setCategories] = useState<Category[]>([]);

  const idUser = Cookies.get("authorization");

  useEffect(() => {
    getDataCategory();
  }, []);

  async function getDataCategory() {
    const response = await api.get("/user", {
      headers: { Authorization: JSON.parse(idUser) },
    });
    const user = response.data as User;
    setCategories(user.categories);
  }

  async function register(e: FormEvent) {
    // registrar uma renda/compra.
    e.preventDefault();
    const data = { name, value, idCategory, date, idMonth };
    console.log(data);
    try {
      if (typePayment === "entrada") {
        await api.post("/income", data, {
          headers: { Authorization: JSON.parse(idUser) },
        });
      } else {
        await api.post("/bill", data, {
          headers: { Authorization: JSON.parse(idUser) },
        });
      }
      toast.success("Registo realizado com sucesso! 🤑", {
        duration: 2000,
      });
    } catch (err) {
      alert("Erro ao registrar, tente novamente!" + err);
    }
  }

  // useEffect(() => {
  //   listCategories();
  // }, []);

  // async function listCategories(){  //listar categorias no select (talvez a rota esteja errada)
  //   verifyCookiesAndSetUser();
  //   const response = await api.get("/category", {
  //     params: { category: "Alimentação" },
  //     headers: { Authorization: idUser },
  //   });
  //   setCategories(response.data);
  // }

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <span>CADASTRAR TRANSAÇÃO</span>
      </header>

      <div className={styles.menu}>
        <form className={styles.formulary} onSubmit={register}>
          <div className={styles.title}>
            <input
              type="text"
              placeholder="Título"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className={styles.miniInputs}>
            <input
              type="number"
              placeholder="Valor"
              required
              value={value}
              onChange={(e) => setValue(Number(e.target.value))}
            />
            <input
              type="date"
              name="date"
              id="date"
              required
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>
          <div className={styles.optionsRadio}>
            <div className={styles.deposit}>
              <label htmlFor="inputDeposit">Entrada</label>
              <input
                type="radio"
                name="income"
                onChange={(e) => {
                  setTypePayment("endrata");
                }}
              />
            </div>
            <div className={styles.withdraw}>
              <label htmlFor="inputDeposit">Saída</label>
              <input
                type="radio"
                name="income"
                onChange={(e) => {
                  setTypePayment("saida");
                }}
              />
            </div>
          </div>
          <div className={styles.category}>
            <select
              name="categorys"
              id="categorys"
              required
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value={0}>Selecione a categoria</option>
              {categories.map((category, key) => (
                <option value={category.name} key={key}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
          <div className={styles.registerButton}>
            <button type="submit">
              <div className={styles.buttonContent}>
                CADASTRAR
                <FiCheckCircle />
              </div>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
