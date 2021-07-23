import styles from './styles.module.scss';
import { AiFillDelete, AiFillEdit } from 'react-icons/ai';

export default function TableInfo(){
  return (
    <div className = { styles.container }>
      <table>
        <thead>
          <tr className = { styles.tHead }>
            <th>Data</th>
            <th>Título</th>
            <th>Categoria</th>
            <th>Valor</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>

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
          
        </tbody>
      </table>
    </div>
  );
}