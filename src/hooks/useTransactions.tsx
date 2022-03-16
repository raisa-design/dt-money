import {createContext, ReactNode, useContext, useEffect, useState} from 'react';
import { api } from '../services/api';

interface Transaction{
  id:number,
  title:string,
  type:string,
  amount:number,
  category:string,
  createdAt:string
}

 type TransactionInput = Omit<Transaction, 'id' |'createdAt'>;
 //Esta linha faz com que eu utilize os mesmos elementos da interface Transaction, porém eliminando o ID e CREATEDAT, isso para que não haja necessidade de criar outra interface.

//Ou

//type TransactionIput = Pick<Transaction, 'title' |'type'| 'amount'|'category'>;
//Nesta linha eu considero, os elementos que eu desejo ter da interface Transaction.

interface TransactionsProviderProps{
  children:ReactNode;
}

interface TransactionsContextData{
  transactions: Transaction[];
  createTransaction:(transaction: TransactionInput) =>Promise<void>;
}

const TransactionsContext = createContext<TransactionsContextData>(
  {} as TransactionsContextData
);

export function TransactionsProvider ({children}:TransactionsProviderProps){
  const[transactions, setTransactions]=useState<Transaction[]>([]);

  useEffect(()=>{
    api.get('transactions')
    .then(response=>setTransactions(response.data.transactions))
  }, []);

  async function createTransaction(transactionInput:TransactionInput){
   const response = await api.post('/transactions', {
     ...transactionInput,
     createdAt: new Date()
   })

   const {transaction} = response.data;

   setTransactions([
     ...transactions,
     transaction,
   ]);
  }
  

  return(
    <TransactionsContext.Provider value={{transactions, createTransaction}}>
      {children}
    </TransactionsContext.Provider>
  );

}
export function useTransactions(){
  const context = useContext (TransactionsContext);

  return context;
}