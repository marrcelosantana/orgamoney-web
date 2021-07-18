import styles from "./styles.module.scss";
import TableInfo from "../TableInfo";

export default function RegisteredData() {
  return(
    <div className = { styles.container }>
      <header className = { styles.header }>
        <span>DADOS REGISTRADOS</span>
         <div className={styles.date}>
         <select name="month" id="month">
            <option value="1" disabled selected>Mês</option>
            <option value="2">Fevereiro</option>
            <option value="3">Janeiro</option>
          </select>
          <select name="year" id="year">
            <option value="1" disabled selected>Ano</option>
            <option value="2">2021</option>
            <option value="3">2020</option>
          </select>
        </div>
      </header>
      <div className = { styles.content }>
          <TableInfo />
      </div>
      {/* <footer className = { styles.footer }>
        <div className = { styles.info }>
          <label>ENTRADAS: <span className = { styles.deposit }>R$3000,00</span></label>
          <label>SAÍDA: <span className = { styles.withdraw }>R$2000,00</span></label>
        </div>
        <div className = { styles.total }>
          <span>TOTAL: +R$1000,00</span>
        </div>
      </footer> */}
    </div>
  ); 
}












