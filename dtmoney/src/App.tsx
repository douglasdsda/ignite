import { Dashboard } from "./components/Dashboard";
import { Header } from "./components/Header";
import { GlobalStyle } from "./styles/global";
import Modal from "react-modal";
import { useState } from "react";
import { NewTransactionModal } from "./components/NewTransactionModal";
import { TransactionsProvider } from "./hooks/UseTransactions";

Modal.setAppElement("#root");

export function App() {
  const [isNewTransactionModalOpen, setIsNewTransactionModalOpen] = useState(
    false
  );

  function handleOpenNewTransactionModalOpen() {
    setIsNewTransactionModalOpen(true);
  }

  function handleCloseNewTransactionModalOpen() {
    setIsNewTransactionModalOpen(false);
  }

  return (
    <TransactionsProvider>
      <Header onOpenNewTransactionModal={handleOpenNewTransactionModalOpen} />
      <Dashboard />
      <NewTransactionModal
        isOpen={isNewTransactionModalOpen}
        onRequestClose={handleCloseNewTransactionModalOpen}
      />

      <GlobalStyle />
    </TransactionsProvider>
  );
}
