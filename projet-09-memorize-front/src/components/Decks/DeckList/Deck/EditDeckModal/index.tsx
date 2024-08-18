import { FormEvent, useState } from "react";
import ModalContainer, { ModalProps } from "../../../../ModalContainer";
import { editDeck } from "../../../../../store/actions/decks/editDeck";
import { useAppDispatch } from "../../../../../hooks/redux";

interface EditDeckModalProps extends ModalProps {
  deckId: number | null;
}

const EditDeckModal = ({ isOpen, onClose, deckId }: EditDeckModalProps) => {
  const [updatedDeck, setUpdatedDeck] = useState({
    name: "",
    description: "",
  });

  const dispatch = useAppDispatch();

  const handleEditDeckSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(updatedDeck);
    dispatch(editDeck({ deckId, updatedDeck }));

    setUpdatedDeck({ name: "", description: "" });
    onClose();
  };

  const handleEditDeckField = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    console.log(name, value);
    setUpdatedDeck({ ...updatedDeck, [name]: value });
  };

  return (
    <ModalContainer
      isOpen={isOpen}
      onClose={onClose}
      modalTitle="Modifier le deck"
      handleSubmitType={handleEditDeckSubmit}
    >
      <input
        type="text"
        name="name"
        placeholder="Modifier le nom du deck"
        className="w-full border-2 border-gray-300 p-2 rounded-md"
        defaultValue={updatedDeck.name}
        onChange={handleEditDeckField}
      />
      <input
        type="text"
        name="description"
        placeholder="Modifier la description du deck"
        className="w-full border-2 border-gray-300 p-2 rounded-md"
        value={updatedDeck.description}
        onChange={handleEditDeckField}
      />
    </ModalContainer>
  );
};

export default EditDeckModal;
