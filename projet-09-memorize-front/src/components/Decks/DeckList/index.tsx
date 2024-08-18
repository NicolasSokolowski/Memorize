import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import { getAllDecks } from "../../../store/actions/decks/allDecks";
import Deck from "./Deck";

const DeckList = () => {
  const dispatch = useAppDispatch();
  const allDecks = useAppSelector((state) => state.decks.decks);

  useEffect(() => {
    dispatch(getAllDecks());
  }, []); 

  return (
    <>
      {allDecks.length > 0 &&
        allDecks.map((deck) => <Deck key={deck.id} deck={deck} />)}
    </>
  );
};

export default DeckList;
