import { useState } from "react";
import "./style.scss";
import EditCardModal from "./EditCardModal";
import DeleteCardModal from "./DeleteCardModal";
import { CardInterface } from "../../../../store/reducers/cards";
import editLogo from "../../../../assets/pencil.png";
import deleteLogo from "../../../../assets/trash.png"; 

export interface CardProps {
  card: CardInterface;
}

function Card({ card }: CardProps) {
  // Set up a state boolean to know if the flip is true or false
  const [flip, setFlip] = useState(false);

  // Function who toggle the boolean state variable flip from true to false or from false to true
  const handleCardClick = () => {
    setFlip(!flip);
  };

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const handleEditClick = () => {
    setIsEditModalOpen(true);
  };

  const handleDeleteClick = () => {
    setIsDeleteModalOpen(true);
  };

  return (
    <>
      <div className="mt-2 mx-4">
        <div
          className={`flip-card ${flip ? "flip" : ""}`}
          onClick={handleCardClick}
        >
          <div className="flip-card-inner">
            <div className="flip-card-front">
              <p className="title">{card.front}</p>
            </div>
            <div className="flip-card-back">
              <p className="title">{card.back}</p>
            </div>
          </div>
        </div>

        <div className="flex mt-3 justify-center item-center mb-3">
          <input
            type="image"
            src={editLogo}
            className="size-6 mr-10"
            onClick={handleEditClick}
          />
          <EditCardModal
            isOpen={isEditModalOpen}
            onClose={() => {
              setIsEditModalOpen(false);
            }}
            cardId={card.id}
          />

          <input
            type="image"
            src={deleteLogo}
            className="size-6 ml-10"
            onClick={handleDeleteClick}
          />
          <DeleteCardModal
            isOpen={isDeleteModalOpen}
            onClose={() => {
              setIsDeleteModalOpen(false);
            }}
            cardId={card.id}
          />
        </div>
      </div>
   </> 
  );
}

export default Card;
