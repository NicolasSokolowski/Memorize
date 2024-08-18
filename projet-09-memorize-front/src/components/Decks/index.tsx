import { useState } from "react";
import DeckList from "./DeckList";
import CreateDeckModal from "./CreateDeckModal";
import { useAppSelector } from "../../hooks/redux";

const Decks = () => {
  const { username } = useAppSelector((state) => state.user);

  const [isCreateModalOpen, setCreateModalOpen] = useState(false);

  return (
    <>
      <h2 className="flex justify-center text-2xl mt-3 xl:content-start xl:justify-start">Salut {username} !</h2>
      <div className="flex flex-wrap justify-center mt-2 mb-2 sm:space-x-2 xl:justify-end xl:space-x-4 xl:mb-4">
        <button
          className="bg-1F3D75 text-white px-4 py-2 rounded mt-2.5 mb-2 flex justify-center"
          onClick={(event) => {
            event.preventDefault();
            setCreateModalOpen(true);
          }}
        >
          Créer un nouveau deck
        </button>
        <CreateDeckModal
          isOpen={isCreateModalOpen}
          onClose={() => {
            setCreateModalOpen(false);
          }}
        />

        <div className="search-container flex justify-center">
          <input
            type="search"
            placeholder="Chercher les decks"
            className="border-2 border-gray-300 p-2 mt-2 rounded-md"
          />
          <button className="bg-1F3D75 text-white p-2 mt-2 ml-1 rounded-md">
            Search
          </button>
        </div>

      </div>

      <div className="flex flex-wrap justify-center xl:justify-start">
        <DeckList />
      </div>
    </>
  );
};

export default Decks;
