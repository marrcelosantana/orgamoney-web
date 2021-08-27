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
  const [data, setData] = useState<(string | number)[][]>();
  const [data2, setData2] = useState<(string | number)[][]>();

  class Recip {
    name: string;
    value: number;
  }

  function orderByCategory(array: Recip[]) {
    let newArray = [new Recip()];
    array.forEach((item) => {
      let tem = false;
      newArray.forEach((itemInNewArray) => {
        if (itemInNewArray.name === item.name) {
          itemInNewArray.value += item.value;
          tem = true;
        }
      });
      if (!tem) {
        newArray.push(item);
      }
    });
    return newArray;
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
      const filteredBills = orderByCategory(bills);
      const filteredIncome = orderByCategory(income);
      let aux = filteredBills.map((item) => {
        return [item.name, item.value];
      });
      setData(header.concat(aux));
      aux = filteredIncome.map((item) => {
        return [item.name, item.value];
      });
      setData2(header.concat(aux));
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
          height={"23vh"}
        />
        <Chart
          className={styles.graphic}
          chartType="PieChart"
          data={data2}
          options={options}
          width={"100%"}
          height={"23vh"}
        />
      </div>
    </div>
  );
}
