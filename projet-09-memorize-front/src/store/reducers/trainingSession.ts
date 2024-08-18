import { createReducer } from "@reduxjs/toolkit"
import { setCurrentDifficulty, getAllTrainingCards } from "../actions/trainingSession/getTrainingCards";

export interface Card {
  id: number;
  front: string;
  back: string;
  difficulty: number;
  isCardMemorized: boolean;
}

export interface TrainingSession {
  cards: Card[];
  loading: boolean;
  errorMessage: string | null;
  index: number,
  cardsSetToHard: Card[];
}

const initialState: TrainingSession = { 
    cards: [],
    loading: false,
    errorMessage: null,
    index: 0,
    cardsSetToHard: [],    
}

const trainingSessionReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(getAllTrainingCards.pending, (state) => {
      state.loading = true;
      state.errorMessage = null;
    })

    .addCase(getAllTrainingCards.fulfilled, (state, action) => {
      state.loading = false;

      let sortedCards = state.cards
      sortedCards = action.payload.sort(
        (a: Card, b: Card) => { return a.difficulty - b.difficulty }
      );

      const hardestCards = sortedCards.slice(0, 15);

      const isCardMemorizedProperty = hardestCards.map(
        card => ({
          ...card, 
          isCardMemorized: false, 
        })
      );

      const modifyNewCardsDifficulty = isCardMemorizedProperty.map(
        card => card.difficulty === 0 ? (
          {...card, difficulty: 1})
          : card
        );

      state.cards = modifyNewCardsDifficulty;      
    })

    .addCase(getAllTrainingCards.rejected, (state) => {
      state.loading = false;
      state.errorMessage = "An error occurred while preparing the training deck"
    })

    .addCase(setCurrentDifficulty, (state, action) => {
      const index = state.cards.findIndex((el) => el.id === action.payload.id);

      if (action.payload.currentDifficulty === 1) {
        state.cards[index].difficulty === 32
          ? state.cards[index] = {
            ...state.cards[index], 
            isCardMemorized: true
          }
          : state.cards[index] = { 
            ...state.cards[index], 
            difficulty: state.cards[index].difficulty * 2, 
            isCardMemorized: true
          }
      }

      if (action.payload.currentDifficulty === 2) {
        state.cards[index].difficulty === 1 
          ? state.cards[index] = {
            ...state.cards[index], 
            isCardMemorized: true
          }
          : state.cards[index] = { 
            ...state.cards[index], 
            difficulty: state.cards[index].difficulty / 2, 
            isCardMemorized: true
          }
      }

      if (action.payload.currentDifficulty === 3) {
        state.cards[index] = { 
          ...state.cards[index], 
          difficulty: state.cards[index].difficulty = 1, 
          isCardMemorized: true,
        }
      }
    })
})


export default trainingSessionReducer;