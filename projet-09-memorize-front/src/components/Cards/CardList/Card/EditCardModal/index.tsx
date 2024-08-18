import { FormEvent, useState } from "react";
import ModalContainer, { ModalProps } from "../../../../ModalContainer";
import { editCard } from "../../../../../store/actions/cards/editCard";
import { useAppDispatch } from "../../../../../hooks/redux";
import { useParams } from "react-router-dom";

interface EditCardModalProps extends ModalProps {
  cardId: number | null;
}

const EditCardModal = ({ isOpen, onClose, cardId }: EditCardModalProps) => {
  const [updatedCard, setUpdatedCard] = useState({
    front: "",
    back: "",
  });

  const { deckId } = useParams();

  const dispatch = useAppDispatch();

  const handleEditCardSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(updatedCard);
    dispatch(editCard({ deckId, cardId, updatedCard }));
    setUpdatedCard({ front: "", back: "" });
    onClose();
  };

  const handleEditCardField = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    console.log(name, value);
    setUpdatedCard({ ...updatedCard, [name]: value });
  };

  return (
    <ModalContainer
      isOpen={isOpen}
      onClose={onClose}
      modalTitle="Modifier une carte"
      handleSubmitType={handleEditCardSubmit}
    >
      <input
        type="text"
        name="front"
        placeholder="Modifier votre question"
        className="w-full border-2 border-gray-300 p-2 rounded-md"
        value={updatedCard.front}
        onChange={handleEditCardField}
      />
      <input
        type="text"
        name="back"
        placeholder="Modifier votre réponse"
        className="w-full border-2 border-gray-300 p-2 rounded-md"
        value={updatedCard.back}
        onChange={handleEditCardField}
      />
    </ModalContainer>
  );
};

export default EditCardModal;
