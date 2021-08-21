import styles from "./styles.module.scss";
import { FormEvent, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Toaster } from "react-hot-toast";
import {
  FiCheckCircle,
  FiArrowDownCircle,
  FiArrowUpCircle,
} from "react-icons/fi";
import api from "../../services/api";
import User from "../../models/user";
import { useUserContext } from "../../contexts/UserContext";
import Category from "../../models/category";
import Cookies from "js-cookie";
import { RiAddCircleFill } from "react-icons/ri";

export default function RegisterTransaction() {
  const { month, handleSetReload } = useUserContext();

  const [name, setName] = useState("");
  const [value, setValue] = useState(0);
  const [idCategory, setCategory] = useState("");
  const [date, setDate] = useState("");
  const [typePayment, setTypePayment] = useState("");
  const [categoryCreate, setCategoryCreate] = useState(false);
  const [nameCategory, setNameCategory] = useState("");
  const [categories, setCategories] = useState<Category[]>([]);
  const [reloadCategory, setReloadCategory] = useState(false);
  const idUser = Cookies.get("authorization");

  useEffect(() => {
    getDataCategory();
  }, [categoryCreate]);

  async function getDataCategory() {
    const response = await api.get("/user", {
      headers: { Authorization: JSON.parse(idUser) },
    });
    const user = response.data as User;
    setCategories(user.categories);
  }

  async function registerCategory() {
    try {
      if (!nameCategory.trim()) {
        toast.error("Erro ao cadastrar categoria, tente novamente! 😓", {
          duration: 2000,
        });
        return;
      }
      const data = { name: nameCategory };
      await api.post("/category", data, {
        headers: { Authorization: JSON.parse(idUser) },
      });
      toast.success("Categoria cadastrada com sucesso!", {
        duration: 2000,
      });
      setTimeout(() => {
        setCategoryCreate(false);
      }, 2000);
    } catch (err) {
      console.log(err.menssage);
      toast.error("Erro ao cadastrar categoria, tente novamente! 😓", {
        duration: 2000,
      });
    }
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
      handleSetReload();
      toast.success("Transação cadastrada com sucesso! 🤑", {
        duration: 6000,
      });
    } catch (err) {
      toast.error("Erro ao cadastrar transação, tente novamente! 😓", {
        duration: 6000,
      });
    }
  }

  async function update(e: FormEvent) {
    // editar uma renda/compra.
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
      handleSetReload();
      toast.success("Transação editada com sucesso! 🤑", {
        duration: 2000,
      });
    } catch (err) {
      toast.error("Erro ao editar transação, tente novamente! 😓", {
        duration: 2000,
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
            <button
              className={
                typePayment === "entrada"
                  ? styles.depositSelected
                  : styles.deposit
              }
              type="button"
              name="income"
              onClick={(e) => {
                setTypePayment("entrada");
              }}
            >
              <div className={styles.buttonContent}>
                <span>Entrada</span>
                <FiArrowUpCircle />
              </div>
            </button>

            <button
              className={
                typePayment === "saida"
                  ? styles.withdrawSelected
                  : styles.withdraw
              }
              type="button"
              name="income"
              onClick={(e) => {
                setTypePayment("saida");
              }}
            >
              <div className={styles.buttonContent}>
                <span>Saída</span>
                <FiArrowDownCircle />
              </div>
            </button>
          </div>
          {categoryCreate ? (
            <div className={styles.categoryInput}>
              <div className={styles.newCategory}>
                <input
                  className={styles.input}
                  required
                  placeholder="Adicione uma categoria"
                  onChange={(e) => {
                    setNameCategory(e.target.value);
                  }}
                />
                <div className={styles.addCategory}>
                  <RiAddCircleFill
                    className={styles.iconAdd}
                    onClick={() => {
                      registerCategory();
                    }}
                  />
                </div>
              </div>
            </div>
          ) : (
            <div className={styles.category}>
              <select
                name="categorys"
                id="categorys"
                required
                onChange={(e) => setCategory(e.target.value)}
                onClick={() => {
                  setReloadCategory(!registerCategory);
                }}
              >
                <option disabled selected value={0}>
                  Selecione a categoria
                </option>
                {categories.map((category, key) => (
                  <option value={category.name} key={key}>
                    {category.name}
                  </option>
                ))}
              </select>
              <div className={styles.addCategory}>
                <RiAddCircleFill
                  className={styles.iconAdd}
                  onClick={() => {
                    setCategoryCreate(true);
                  }}
                />
              </div>
            </div>
          )}
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
