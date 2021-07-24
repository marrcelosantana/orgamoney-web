import styles from "./styles.module.scss";
import { FormEvent, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Toaster } from "react-hot-toast";
import { FiCheckCircle } from "react-icons/fi";
import api from "../../services/api";
import User from "../../models/user";
import { useUserContext } from "../../contexts/UserContext";
import Category from "../../models/category";
import Cookies from "js-cookie";
import { useContext } from "react";

export default function RegisterTransaction() {
  const { month } = useUserContext();

  const [name, setName] = useState("");
  const [value, setValue] = useState(0);
  const [idCategory, setCategory] = useState("");
  const [date, setDate] = useState("");
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
    const data = { name, value, idCategory, date, idMonth: month };
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
      toast.success("Transação cadastrada com sucesso! 🤑", {
        duration: 6000,
      });
    } catch (err) {
      toast.error("Erro ao cadastrar transação, tente novamente! 😓", {
        duration: 6000,
      });
    }
  }

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <span>CADASTRAR TRANSAÇÃO</span>
      </header>
      <Toaster />
      <Toaster />
      <div className={styles.menu}>
        <form className={styles.formulary}>
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
            <div
              className={
                typePayment === "entrada"
                  ? styles.depositSelected
                  : styles.deposit
              }
            >
              <label htmlFor="inputDeposit">Entrada</label>
              <input
                type="radio"
                name="income"
                onChange={(e) => {
                  setTypePayment("entrada");
                }}
              />
            </div>
            <div
              className={
                typePayment === "saida"
                  ? styles.withdrawSelected
                  : styles.withdraw
              }
            >
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
              <div className={styles.buttonContent} onClick={register}>
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
