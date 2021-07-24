import styles from "./styles.module.scss";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import api from "../../services/api";
import { useState } from "react";
import toast from "react-hot-toast";
import { useUserContext } from "../../contexts/UserContext";

export default function TableInfo() {
  const { month, authorization, selectMonth } = useUserContext();

  const [income, setIncome] = useState([]);

  async function handleDeleteData(idIncome) {
    try {
      await api.delete(`/income/${idIncome}`, {
        params: { idIncome, idMonth: month },
        headers: { Authorization: JSON.parse(authorization) },
      });
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
          {selectMonth?.incomes.map((income) => (
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
          {selectMonth?.bills.map((bill) => (
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
