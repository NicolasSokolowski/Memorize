import { FormEvent, useState } from "react";
import ModalContainer, { ModalProps } from "../../ModalContainer";
import { useAppDispatch } from "../../../hooks/redux";
import { createCard } from "../../../store/actions/cards/createCard";

const CreateCardModal = ({ isOpen, onClose, deckId }: ModalProps) => {
  const [newCard, setNewCard] = useState({
    front: "",
    back: "",
  });

  const dispatch = useAppDispatch();

  const handleCreateCardSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch(createCard({ newCard, deckId }));
    setNewCard({ front: "", back: ""});
    onClose();
  };

  const handleChangeCardField = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = event.target;

    setNewCard({ ...newCard, [name]: value });
  };

  return (
    <ModalContainer
      isOpen={isOpen}
      onClose={onClose}
      modalTitle="Créer une carte"
      handleSubmitType={handleCreateCardSubmit}
    >
      <input
        type="text"
        name="front"
        placeholder="Nouvelle question"
        aria-label="Nom de la nouvelle question"
        className="w-full border-2 border-gray-300 p-2 rounded-md"
        value={newCard.front}
        onChange={handleChangeCardField}
      />
      <input
        type="text"
        name="back"
        placeholder="Nouvelle réponse"
        aria-label="Nom de la nouvelle réponse"
        className="w-full border-2 border-gray-300 p-2 rounded-md"
        value={newCard.back}
        onChange={handleChangeCardField}
      />
    </ModalContainer>
  );
};

export default CreateCardModal;
