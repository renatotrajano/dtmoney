import { useTransactions } from "../../hooks/useTransactions";
import { Container } from "./styles";
import removeIcon from '../../assets/bin.png'

export function TransactionTable() {
    const { transactions, removeTransaction } = useTransactions();

    function handleRemoveTransaction(transactionId: number) {
        removeTransaction(transactionId);
    }

    return (
        <Container>
            <table>
                <thead>
                    <tr>
                        <th>Título</th>
                        <th>Valor</th>
                        <th>Categoria</th>
                        <th>Data</th>
                    </tr>
                </thead>

                <tbody>
                    {transactions.map(transaction => (
                        <tr key={transaction.id}>
                            <td>{transaction.title}</td>
                            <td className={transaction.type}>{new Intl.NumberFormat('pt-BR', {
                                style: 'currency',
                                currency: 'BRL'
                            }).format(transaction.amount)}
                            </td>
                            <td>{transaction.category}</td>
                            <td>
                                {new Intl.DateTimeFormat('pt-BR').format(
                                    new Date(transaction.createDate)
                                )}
                            </td>
                            <td>
                                <button onClick={() => handleRemoveTransaction(transaction.id)}>
                                    <img src={removeIcon} alt="remover" />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </Container>
    );
}