import styles from "./styles.module.scss";
import { Chart } from "react-google-charts";
import { useState } from "react";

export default function Graphics() {
  const [options, setOptions] = useState({
    title: "Gráfico de Pizza",
  });
  const [data, setData] = useState([
    ["Linguagens", "Quantidade"],
    ["Renda", 100],
    ["Transporte", 80],
    ["Alimentação", 50],
  ]);

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
        />
      </div>
    </div>
  );
}
