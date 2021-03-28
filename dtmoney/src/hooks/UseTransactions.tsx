import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { api } from "../services/api";

const TransactionsContext = createContext<TransactionsContextData>(
  {} as TransactionsContextData
);

interface Transaction {
  id: number;
  title: string;
  type: string;
  category: string;
  amount: number;
  createdAt: string;
}

type TransactionInput = Omit<Transaction, "id" | "createdAt">;
// type TransactionInput = Pick<Transaction, 'title' | 'amout' | 'type' | 'category'>;

interface TransactionsProviderProps {
  children: ReactNode;
}

interface TransactionsContextData {
  transactions: Transaction[];
  createTransaction: (transaction: TransactionInput) => Promise<void>;
}

export function TransactionsProvider({ children }: TransactionsProviderProps) {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    api("transactions").then((response) => {
      setTransactions(response.data.transactions);
    });
  }, []);

  async function createTransaction(transactionInput: TransactionInput) {
    const result = await api.post("/transactions", {
      ...transactionInput,
      createdAt: new Date(),
    });
    const { transaction } = result.data;
 
    setTransactions([...transactions, transaction]);
  }

  return (
    <TransactionsContext.Provider
      value={{
        transactions,
        createTransaction,
      }}
    >
      {children}
    </TransactionsContext.Provider>
  );
}

export function useTransactions(){
  const context = useContext(TransactionsContext);
  return context;
}
