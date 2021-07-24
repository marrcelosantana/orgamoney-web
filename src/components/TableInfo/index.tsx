import styles from "./styles.module.scss";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import api from "../../services/api";
import { useEffect, useState } from "react";
import Month from "../../models/month";
import toast from "react-hot-toast";
import Cookies from "js-cookie";

export default function TableInfo() {
  const idUser = Cookies.get("authorization");

  const [months, setMonths] = useState<Month>();
  const [income, setIncome] = useState([]);

  useEffect(() => {
    getDataMonth();
  }, []);

  async function getDataMonth() {
    const response = await api.get("/month", {
      params: { month: "Abril" },
      headers: { Authorization: JSON.parse(idUser) },
    });
    setMonths(response.data);
  }

  async function handleDeleteData(idIncome) {
    try {
      await api.delete(`income/${idIncome}`, {
        //Função ainda não está funcionando.
        params: { idIncome, idMonth: "Abril" },
        headers: { Authorization: idUser },
      });
      setIncome(income.filter((income) => income.id !== idIncome));
    } catch (err) {
      toast.error("Não foi possível deletar, tente novamente!");
    }
  }

  return (
    <div className={styles.container}>
      <table>
        <thead>
          <tr className={styles.tHead}>
            <th>Data</th>
            <th>Título</th>
            <th>Categoria</th>
            <th>Valor</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {months?.incomes.map((income) => (
            <tr className={styles.tBody} key={income.id}>
              <td>
                {new Intl.DateTimeFormat("pt-BR").format(new Date(income.date))}
              </td>
              <td>{income.name}</td>
              <td>{income.category.name}</td>
              <td className={styles.valueDeposit}>
                {new Intl.NumberFormat("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                }).format(income.value)}
              </td>
              <td>
                <AiFillEdit className={styles.icons} />
                <AiFillDelete
                  className={styles.icons}
                  onClick={() => handleDeleteData(income.id)}
                />
              </td>
            </tr>
          ))}
          {months?.bills.map((bill) => (
            <tr className={styles.tBody} key={bill.id}>
              <td>
                {new Intl.DateTimeFormat("pt-BR").format(new Date(bill.date))}
              </td>
              <td>{bill.name}</td>
              <td>{bill.category.name}</td>
              <td className={styles.valueWithdraw}>
                {new Intl.NumberFormat("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                }).format(bill.value)}
              </td>
              <td>
                <AiFillEdit className={styles.icons} />
                <AiFillDelete
                  className={styles.icons}
                  onClick={() => handleDeleteData(bill.id)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
