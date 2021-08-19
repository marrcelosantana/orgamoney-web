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

  class Recip {
    name: string;
    value: number;
  }

  function handleData() {
    if (selectMonth) {
      let bills = selectMonth.bills.map((bill) => {
        let recip = new Recip();
        recip.name = bill.category.name;
        recip.value = bill.value;
        return recip;
      });
      let income = selectMonth.incomes.map((income) => {
        let recip = new Recip();
        recip.name = income.category.name;
        recip.value = income.value;
        return recip;
      });
      const billsAndIncomes = bills.concat(income);
      let recips = [new Recip()];
      billsAndIncomes.forEach((billOrIncome) => {
        let tem = false;
        recips.forEach((recip) => {
          if (recip.name === billOrIncome.name) {
            recip.value += billOrIncome.value;
            tem = true;
          }
        });
        if (!tem) {
          recips.push(billOrIncome);
        }
      });
      const filteredRecips = recips.map((recip) => {
        return [recip.name, recip.value];
      });
      setData(header.concat(filteredRecips));
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
