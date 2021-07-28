import { createContext, useEffect, useState, ReactNode, useContext } from 'react';
import { api } from '../services/api';

interface Transaction {
    id: number;
    title: string;
    amount: number;
    type: string;
    category: string;
    createDate: string;
}

//interface TransactionInput {
//    title: string;
//    amount: number;
//    type: string;
//    category: string;
//}

//herda todos os dados da tipagem Transaction, menos id e a data
//pega todos os campos e retira alguns
type TransactionInput = Omit<Transaction, 'id' | 'createDate'>

interface TransactionsProviderProps {
    children: ReactNode;
}

interface TransactionsContextData {
    transactions: Transaction[];
    createTransaction: (transaction: TransactionInput) => Promise<void>;
    removeTransaction: (transactionId: number) => void;
}

const TransactionContext = createContext<TransactionsContextData>(
    {} as TransactionsContextData
);

export function TransactionsProvider({ children }: TransactionsProviderProps) {
    const [transactions, setTransactions] = useState<Transaction[]>([])

    useEffect(() => {
        api.get('transactions')
            .then(response => setTransactions(response.data.transactions))
    }, []);

    async function createTransaction(transactionInput: TransactionInput) {
        const response = await api.post('/transactions', {
            ...transactionInput,
            createDate: new Date(),
        })
        const { transaction } = response.data;

        setTransactions([
            ...transactions,
            transaction,
        ]);
    }

    const removeTransaction = (transactionId: number) => {
        try {
            const updatedTransactions = [...transactions];
            const transactionIndex = updatedTransactions.findIndex(transaction => transaction.id === transactionId);

            if (transactionIndex >= 0) {
                updatedTransactions.splice(transactionIndex, 1);
                setTransactions(updatedTransactions);
            } else {
                throw Error();
            }
        } catch {
            alert('Erro ao remover');
        }
    }

    return (
        <TransactionContext.Provider value={{ transactions, createTransaction, removeTransaction}}>
            {children}
        </TransactionContext.Provider>
    )
}

export function useTransactions() {
    const context = useContext(TransactionContext);

    return context;
}