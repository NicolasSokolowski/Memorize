import { useState } from "react";
import DeleteDeckModal from "./DeleteDeckModal";
import "./styles.scss";
import EditDeckModal from "./EditDeckModal";
import { Deck as DeckInterface } from "../../../../store/reducers/decks";
import { useAppSelector } from "../../../../hooks/redux";

import { Link } from "react-router-dom";
import { useNavigate, useParams } from "react-router-dom";
import editLogo from "../../../../assets/pencil.png";
import deleteLogo from "../../../../assets/trash.png";
import startLogo from "../../../../assets/go.png"

export interface DeckProps {
  deck: DeckInterface;
}

const Deck = ({ deck }: DeckProps) => {

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const allCards = useAppSelector((state) => state.cards.cards);
  const navigate = useNavigate();

  const { deckId } = useParams()

  
  const handleClickSession = () => {
    console.log(deckId);
    navigate(`/decks/${deck.id}/trainingsession`)
    }
   
  const countNewCards = allCards.filter((card) => card.difficulty === 0).length; 
  const countEasyCards = allCards.filter((card) => card.difficulty === 32 ).length;
  const countMediumCards = allCards.filter((card) => card.difficulty === 8 ).length;
  const countHardCards = allCards.filter((card) => card.difficulty === 2 ).length;


  return (
    <div className="decks-container flex m-4">
      <div className="flip-deck">
        <div className="flex flip-deck-inner">
          <div className="flip-deck-front">
            <Link to={`/decks/${deck.id}`}>
              <h3 className="title py-1">{deck.name}</h3>
            </Link>
            <p className="text-sm mt-2 mb-2">{deck.description}</p>
            <p className="text-xs mt-1 mb-1">{allCards.length} carte{allCards.length > 1 ? "s" : ""}</p>
            <ul className="text-xs mb-3">
              <li>Nouvelles cartes : {countNewCards}</li>
              <li>Easy : {countEasyCards}</li>
              <li>Medium : {countMediumCards}</li>
              <li>Hard : {countHardCards}</li>
            </ul>

          <div className="flex justify-center mb-2"
            onClick={handleClickSession}>
            <input 
              type="image"
              src={startLogo}
              className="white-icon size-10 "
            />
          </div>

          <div className="flex justify-center mb-3">
            <input
              type="image"
              src={editLogo}
              className="white-icon size-5 mr-10"
              onClick={() => {
                setIsEditModalOpen(true);
              }}
            />
            <EditDeckModal
              isOpen={isEditModalOpen}
              onClose={() => {
                setIsEditModalOpen(false);
              }}
              deckId={deck.id}
            />

            <input
              type="image"
              src= {deleteLogo}
              className="white-icon size-5 ml-10"
              onClick={() => {
                setIsDeleteModalOpen(true);
              }}
            />
            <DeleteDeckModal
              isOpen={isDeleteModalOpen}
              onClose={() => {
                setIsDeleteModalOpen(false);
              }}
              deckId={deck.id}
            />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Deck;
