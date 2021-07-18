import styles from './styles.module.scss';
import { AiFillDelete, AiFillEdit } from 'react-icons/ai';

export default function TableInfo(){
  return (
    <div className = { styles.container }>
      <table>
        <tr className = { styles.tHead }>
          <th>Data</th>
          <th>Título</th>
          <th>Categoria</th>
          <th>Valor</th>
          <th>Ações</th>
        </tr>
        <tr className = { styles.tBody }>
          <td>12/05/2020</td>
          <td>Mc Donald's</td>
          <td>Alimentação</td>
          <td className = { styles.valueWithdraw }>-R$100,00</td>
          <td>
            <AiFillEdit className = { styles.icons }/>
            <AiFillDelete className = { styles.icons }/>
          </td>
        </tr>
        <tr className = { styles.tBody }>
          <td>13/05/2020</td>
          <td>Salário</td>
          <td>Renda</td>
          <td className = { styles.valueDeposit }>+R$1500,00</td>
          <td>
            <AiFillEdit className = { styles.icons }/>
            <AiFillDelete className = { styles.icons }/>
          </td>
        </tr>
        <tr className = { styles.tBody }>
          <td>13/05/2020</td>
          <td>Multa do Carro</td>
          <td>Outros</td>
          <td className = { styles.valueWithdraw }>-R$50,00</td>
          <td>
            <AiFillEdit className = { styles.icons }/>
            <AiFillDelete className = { styles.icons }/>
          </td>
        </tr>
      </table>
    </div>
  );
}