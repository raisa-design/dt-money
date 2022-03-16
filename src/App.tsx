import { Header } from "./components/Header";
import Modal from 'react-modal';
import {Deshboard} from "./components/Dashboard";
import React, { useState } from "react";
import { NewTransactionModal } from "./components/NewTransactionModal";
import {  TransactionsProvider,  } from "./hooks/useTransactions";
import { GlobalStyle } from "./style/global";


Modal.setAppElement('#root');
export function App() {
  const [isNewTransactionModalOpen, setIsNewTransactionModalOpen] =  useState(false);

  function handleOpenNewTransactionModal(){
    setIsNewTransactionModalOpen(true);
  }

  function handleCloseNewTransactionModal(){
    setIsNewTransactionModalOpen(false);
  }
  return (
    <TransactionsProvider>
    <Header  onOpenNewTransactionModal={handleOpenNewTransactionModal} />
      <Deshboard/>
      <NewTransactionModal
        isOpen={isNewTransactionModalOpen}
        onRequestClose={handleCloseNewTransactionModal}
      />
      <GlobalStyle/>
      </TransactionsProvider>  
      
  );
}


