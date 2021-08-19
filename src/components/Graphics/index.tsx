import styles from "./styles.module.scss";
import { Chart } from "react-google-charts";
import { useState } from "react";
import { useEffect } from "react";
import { useUserContext } from "../../contexts/UserContext";

export default function Graphics() {
  const { selectMonth } = useUserContext();

  const [options, setOptions] = useState({
    title: "Gráfico Mensal",
  });
  const header = [["Categoria", "Valor"]];
  const [data, setData] = useState(header);

  function handleData() {
    if (selectMonth) {
      let bills = selectMonth.bills.map((bill) => {
        return [bill.category.name, bill.value];
      });
      let income = selectMonth.incomes.map((income) => {
        return [income.category.name, income.value];
      });

      setData(header.concat(bills).concat(income));
    }
  }

  useEffect(() => {
    handleData();
  }, [selectMonth]);

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <span>GRÁFICOS</span>
      </header>
      <div className={styles.pizzaGraphic}>
        <Chart
          className={styles.graphic}
          chartType="PieChart"
          data={data}
          options={options}
          width={"100%"}
        />
      </div>
    </div>
  );
}
