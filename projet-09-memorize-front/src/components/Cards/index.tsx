import { useState } from "react";

import CreateCardModal from "./CreateCardModal";
import EditDeckModal from "../Decks/DeckList/Deck/EditDeckModal";
import DeleteDeckModal from "../Decks/DeckList/Deck/DeleteDeckModal";
import CardList from "./CardList";
import { useParams } from "react-router-dom";
import editLogo from "../../assets/pencil.png";
import deleteLogo from "../../assets/trash.png";
import { useAppSelector } from "../../hooks/redux";

function Cards() {
  const { deckId } = useParams();
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const [isEditDeckModalOpen, setIsEditDeckModalOpen] = useState(false);
  const [isDeleteDeckModalOpen, setIsDeleteDeckModalOpen] = useState(false);

  const handleCreateClick = () => {
    setIsCreateModalOpen(true);
  };

  const deckSelected = useAppSelector((state) =>
    state.decks.decks.find((deck) => deck.id === Number(deckId))
  );
  console.log("Hello i'm:", deckSelected);

  return (
    <main className="container flex flex-col items-center mx-auto p-4 xl:flex-row xl:flex-wrap ">
      <div className="deck-card-btn-container flex flex-col items-center space-x-6 mb-4 xl:flex-row xl:justify-between xl:w-full">
        <div className="deck-name-container flex space-x-3 xl:justify-start">
          <input
            type="image"
            src={editLogo}
            className="size-5 mt-3"
            onClick={() => {
              setIsEditDeckModalOpen(true);
            }}
          />
          <EditDeckModal
            isOpen={isEditDeckModalOpen}
            onClose={() => {
              setIsEditDeckModalOpen(false);
            }}
          />
          <h2 className="text-3xl font-bold text-1F3D75">{deckSelected.name}</h2>
          <input
          type="image"
          src={deleteLogo}
          className="size-5 mt-3"
          onClick={() => {
            setIsDeleteDeckModalOpen(true);
          }}
          />
          <DeleteDeckModal
            isOpen={isDeleteDeckModalOpen}
            onClose={() => {
              setIsDeleteDeckModalOpen(false);
            }}
          />
        </div>

        <div className="card-buttons-container flex flex-col mt-4 space-y-2 xl:flex-row xl:justify-end xl:space-x-3">
          <button
            onClick={handleCreateClick}
            className="px-4 py-2 bg-B4ABCE text-white rounded transition-colors duration-300 ease-in-out hover:bg-F5E9E0 hover:text-1F3D75"
          >
            Nouvelle Carte
          </button>
          <CreateCardModal
            isOpen={isCreateModalOpen}
            onClose={() => {
              setIsCreateModalOpen(false);
            }}
            deckId={deckId}
          />

          <input
            type="text"
            placeholder="Chercher vos cartes"
            className="border p-2 rounded"
          />
          <button className="bg-B4ABCE text-white p-2 mt-2 ml-1 rounded-md">
            Search
          </button>
        </div>
      </div>

      <div className="cards-container flex flex-wrap flex-col items-center xl:flex-row ">
        <CardList />
      </div>
    </main>
  );
}

export default Cards;
