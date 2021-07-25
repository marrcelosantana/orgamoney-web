import styles from "./styles.module.scss";
import { Chart } from "react-google-charts";
import { useState } from "react";

export default function Graphics() {
  const [options, setOptions] = useState({
    title: "Gráfico de Pizza",
  });
  const [optionsBar, setOptionsBar] = useState({
    title: "Gráfico de Barra",
  });
  const [data, setData] = useState([
    ["Linguagens", "Quantidade"],
    ["React", 100],
    ["Angula", 80],
    ["Vue", 50],
  ]);

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <span>GRÁFICOS</span>
      </header>
      <div className={styles.pizzaGraphic}>
        <Chart
          className={styles.graphic}
          width={"500px"}
          height={"300px"}
          chartType="PieChart"
          data={data}
          options={options}
        />
      </div>
    </div>
  );
}
