import styles from "./styles.module.scss";

export default function RegisterTransaction(){
  return(
    <div className = { styles.container }>
      <header className = { styles.header}>
        <span>CADASTRAR TRANSAÇÃO</span>
      </header>
      <div className = { styles.menu }>
        <form className = { styles.formulary }>
            <div className = { styles.title }>
              <input type="text"  placeholder="Título"/>
            </div>
            <div className = { styles.miniInputs }>
              <input type="number"  placeholder="Valor"/>
              <input type="date" name="date" id="date"/>
            </div>
            <div className = { styles.optionButtons }>
              <button className= { styles.depositButton }>
                 <span>ENTRADA</span>
                 <img src= "/images/income.svg" alt="income" /> 
              </button>
              <button className= { styles.withdrawButton }>
                <span>SAÍDA</span>
                 <img src= "/images/outcome.svg" alt="outcome" /> 
              </button>
            </div>
            <div className = { styles.category }>
              <select name="categorys" id="categorys">
                <option value="1">Categorias</option>
              </select>
            </div>
            <div className= { styles.registerButton }>
                <button type="submit">CADASTRAR</button>
            </div>
        </form>
      </div>
    </div>
  );
}