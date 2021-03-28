import { FormEvent, useState } from "react";
import Modal from "react-modal";
 

import closeImg from "../../assets/close.svg";
import incomeImg from "../../assets/income.svg";
import outcomeImg from "../../assets/outcome.svg";

import { Container, TrasactionTypeContainer, RadioBox } from "./styles";
import { useTransactions } from "../../hooks/UseTransactions";

interface NewtransactionModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
}

export function NewTransactionModal({
  isOpen,
  onRequestClose,
}: NewtransactionModalProps) {
  const { createTransaction } = useTransactions();
  const [type, setType] = useState("deposit");
  const [title, setTitle] = useState("");
  const [value, setValue] = useState(0);
  const [category, setCategory] = useState("");

  async function handleCreateNewTransaction(event: FormEvent) {
    event.preventDefault();

    await createTransaction({
      amount: value,
      category,
      title,
      type,
    });
    setTitle("");
    setValue(0);
    setCategory("");
    setType("deposit");
    onRequestClose();
  }

  return (
    <Modal
      overlayClassName="react-modal-overlay"
      className="react-modal-content"
      isOpen={isOpen}
      onRequestClose={onRequestClose}
    >
      <button
        type="button"
        onClick={onRequestClose}
        className="react-modal-close"
      >
        <img src={closeImg} alt="Fechar modal" />
      </button>
      <Container onSubmit={handleCreateNewTransaction}>
        <h2>Cadastrar transação</h2>
        <input
          type="text"
          placeholder="Titulo"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="number"
          placeholder="Valor"
          value={value}
          onChange={(e) => setValue(Number(e.target.value))}
        />

        <TrasactionTypeContainer>
          <RadioBox
            isActive={type === "deposit"}
            activeColor="green"
            type="button"
            onClick={() => setType("deposit")}
          >
            <img src={incomeImg} alt="Entrada" />
            <span>Entrada</span>
          </RadioBox>

          <RadioBox
            isActive={type === "withdraw"}
            activeColor="red"
            type="button"
            onClick={() => setType("withdraw")}
          >
            <img src={outcomeImg} alt="Saida" />
            <span>Saida</span>
          </RadioBox>
        </TrasactionTypeContainer>

        <input
          type="text"
          placeholder="Categoria"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />

        <button type="submit">Cadastrar</button>
      </Container>
    </Modal>
  );
}
