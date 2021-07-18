import styles from "./styles.module.scss";

export default function RegisteredData() {
  return(
    <div className = { styles.container }>
      <header className = { styles.header }>
        <span>DADOS REGISTRADOS</span>
      </header>
      <div className = { styles.content }>
          <p>olá mundo</p>
      </div>
    </div>
  ); 
}














{/* <div className={styles.date}>
  <select name="year" id="year">
    <option value="1">2021</option>
    <option value="1">2020</option>
  </select>
  <select name="month" id="month">
    <option value="1">Fevereiro</option>
    <option value="1">Janeiro</option>
  </select>
</div>; */}
