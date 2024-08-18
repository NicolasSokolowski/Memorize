import { FormEvent } from "react";
import { useAppDispatch } from "../../../../../hooks/redux";
import { deleteDeck } from "../../../../../store/actions/decks/deleteDeck";
import ModalContainer, { ModalProps } from "../../../../ModalContainer";
import { getAllDecks } from "../../../../../store/actions/decks/allDecks";

interface DeleteDeckModalProps extends ModalProps {
  deckId: number | null;
}
const DeleteDeckModal = ({ isOpen, onClose, deckId }: DeleteDeckModalProps) => {
  const dispatch = useAppDispatch();

  const handleDeleteDeckSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch(deleteDeck(deckId));
    dispatch(getAllDecks());
    onClose();
  };

  return (
    <ModalContainer
      isOpen={isOpen}
      onClose={onClose}
      modalTitle="Supprimer le deck"
      handleSubmitType={handleDeleteDeckSubmit}
    >
      <h2>Êtes-vous sûr de vouloir supprimer ce deck et ses cartes ?</h2>
    </ModalContainer>
  );
};

export default DeleteDeckModal;
