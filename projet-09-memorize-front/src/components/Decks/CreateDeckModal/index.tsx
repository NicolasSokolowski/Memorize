import { FormEvent, useState } from "react";
import ModalContainer, { ModalProps } from "../../ModalContainer";
import { useAppDispatch } from "../../../hooks/redux";
import { createDeck } from "../../../store/actions/decks/createDeck";

const CreateDeckModal = ({ isOpen, onClose }: ModalProps) => {
  const [newDeck, setNewDeck] = useState({ name: "", description: "" });

  const dispatch = useAppDispatch();

  const handleCreateDeckSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch(createDeck(newDeck));
    setNewDeck({ name: "", description: "" });
    onClose();
  };

  const handleChangeDeckField = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = event.target;
    setNewDeck({ ...newDeck, [name]: value });
  };

  return (
    <ModalContainer
      isOpen={isOpen}
      onClose={onClose}
      modalTitle="Créer un nouveau Deck"
      handleSubmitType={handleCreateDeckSubmit}
    >
      <input
        type="text"
        name="name"
        placeholder="Nom du nouveau deck"
        aria-label="Nom du nouveau deck"
        className="w-full border-2 border-gray-300 p-2 rounded-md"
        value={newDeck.name}
        onChange={handleChangeDeckField}
      />
      <input
        type="text"
        name="description"
        placeholder="Description du nouveau deck"
        aria-label="Description du nouveau deck"
        className="w-full border-2 border-gray-300 p-2 rounded-md"
        value={newDeck.description}
        onChange={handleChangeDeckField}
      />
    </ModalContainer>
  );
};

export default CreateDeckModal;
