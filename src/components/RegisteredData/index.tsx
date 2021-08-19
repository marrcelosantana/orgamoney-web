import styles from "./styles.module.scss";
import TableInfo from "../TableInfo";
import { useEffect, useState } from "react";
import api from "../../services/api";
import Cookies from "js-cookie";
import Year from "../../models/year";
import Month from "../../models/month";
import { useUserContext } from "../../contexts/UserContext";

export default function RegisteredData() {
  const { month, handleSetMonth, totalEntry, totalExit, totalFinal } =
    useUserContext();

  const idUser = Cookies.get("authorization");
  const [months, setMonths] = useState<Month[]>([]);

  useEffect(() => {
    getDataMonth();
  }, []);

  async function getDataMonth() {
    const response = await api.get("/year", {
      headers: { Authorization: JSON.parse(idUser) },
    });
    const year = response.data as Year[];
    setMonths(year[0].months as Month[]);
  }

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <span>DADOS REGISTRADOS</span>
        <div className={styles.date}>
          <select
            name="month"
            id="month"
            onChange={(e) => handleSetMonth(e.target.value)}
          >
            <option disabled selected>
              {month}
            </option>
            {months.map((_month, key) => (
              <option value={_month.name} key={key}>
                {_month.name}
              </option>
            ))}
          </select>
          <select name="year" id="year">
            <option value="1" disabled selected>
              2021
            </option>
          </select>
        </div>
      </header>
      <div className={styles.content}>
        <TableInfo />
      </div>
      <footer className={styles.footer}>
        <div className={styles.info}>
          <label>
            ENTRADAS:{" "}
            <span className={styles.deposit}>
              {new Intl.NumberFormat("pt-BR", {
                style: "currency",
                currency: "BRL",
              }).format(totalEntry)}
            </span>
          </label>
          <label>
            SAÍDAS:{" "}
            <span className={styles.withdraw}>
              {new Intl.NumberFormat("pt-BR", {
                style: "currency",
                currency: "BRL",
              }).format(totalExit)}
            </span>
          </label>
        </div>
        <div className={styles.total}>
          <label>
            TOTAL:{" "}
            <span
              className={totalFinal >= 0 ? styles.deposit : styles.withdraw}
            >
              {new Intl.NumberFormat("pt-BR", {
                style: "currency",
                currency: "BRL",
              }).format(totalFinal)}
            </span>
          </label>
        </div>
      </footer>
    </div>
  );
}
