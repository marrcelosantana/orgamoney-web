import styles from "./styles.module.scss";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import api from "../../services/api";
import toast from "react-hot-toast";
import { useUserContext } from "../../contexts/UserContext";

export default function TableInfo() {
  const { month, authorization, selectMonth, handleSetMonth, handleSetReload } =
    useUserContext();

  async function handleDeleteDataIncome(idIncome) {
    try {
      await api.delete(`/income`, {
        params: { idIncome, nameMonth: month },
        headers: { Authorization: JSON.parse(authorization) },
      });
      handleSetReload();
    } catch (err) {
      toast.error("Não foi possível deletar, tente novamente!");
      console.log(err);
    }
  }

  async function handleDeleteDataBill(idBill) {
    try {
      await api.delete(`/bill`, {
        params: { idBill, nameMonth: month },
        headers: { Authorization: JSON.parse(authorization) },
      });
      handleSetReload();
    } catch (err) {
      toast.error("Não foi possível deletar, tente novamente!");
      console.log(err);
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
                <AiFillEdit
                  className={styles.icons}
                  style={{ display: "none" }}
                />
                <AiFillDelete
                  className={styles.icons}
                  onClick={() => handleDeleteDataIncome(income.id)}
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
                <AiFillEdit
                  className={styles.icons}
                  style={{ display: "none" }}
                />
                <AiFillDelete
                  className={styles.icons}
                  onClick={() => handleDeleteDataBill(bill.id)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
