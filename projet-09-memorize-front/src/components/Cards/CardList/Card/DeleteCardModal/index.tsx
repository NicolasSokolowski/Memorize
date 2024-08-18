import { FormEvent } from "react";
import ModalContainer, { ModalProps } from "../../../../ModalContainer";
import { getAllCards } from "../../../../../store/actions/cards/allcards";
import { deleteCard } from "../../../../../store/actions/cards/deleteCard";
import { useAppDispatch } from "../../../../../hooks/redux";
import { useParams } from "react-router-dom";

const DeleteCardModal = ({ isOpen, onClose, cardId }: ModalProps) => {
  const { deckId } = useParams();
  const dispatch = useAppDispatch();

  const handleDeleteCardSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch(deleteCard({ deckId, cardId }));
    dispatch(getAllCards(deckId));
    onClose();
  };

  return (
    <ModalContainer
      isOpen={isOpen}
      onClose={onClose}
      modalTitle="Supprimer une carte"
      handleSubmitType={handleDeleteCardSubmit}
    >
      <p>Êtes vous sure de vouloir supprimer votre carte</p>
    </ModalContainer>
  );
};

export default DeleteCardModal;
