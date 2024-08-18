import { createReducer } from "@reduxjs/toolkit";
import { getAllDecks } from "../actions/decks/allDecks";
import { createDeck } from "../actions/decks/createDeck";
import { editDeck } from "../actions/decks/editDeck";
import { deleteDeck } from "../actions/decks/deleteDeck";
import { logout } from "../actions/login";
import { deleteUser } from "../actions/user/deleteUser";

export interface EditDeckProps {
  deckId: number | null;
  updatedDeck: Deck;
}

export interface Deck {
  id: number | null;
  name: string | undefined;
  description: string | null;
  user_id: number | null;
}

interface AllDecksState {
  decks: Deck[];
  isFetching: boolean;
  isCreating: boolean;
  isEditing: boolean;
  isDeleting: boolean;
  loading: boolean;
  errorMessage: string | null;
}

export const initialState: AllDecksState = {
  decks: [],
  isFetching: false,
  isCreating: false,
  isEditing: false,
  isDeleting: false,
  loading: false,
  errorMessage: null,
};

const decksReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(getAllDecks.pending, (state) => {
      state.loading = true;
      state.errorMessage = null;
    })
    .addCase(getAllDecks.fulfilled, (state, action) => {
      state.isFetching = true;
      state.isCreating = false;
      state.isEditing = false;
      state.isDeleting = false;
      state.loading = false;
      state.decks = action.payload;
    })
    .addCase(getAllDecks.rejected, (state) => {
      state.loading = false;
      state.errorMessage = "No associated deck found";
    })

    // CREATE NEW DECK
    .addCase(createDeck.pending, (state) => {
      state.loading = true;
      state.errorMessage = null;
    })

    .addCase(createDeck.fulfilled, (state, action) => {
      state.loading = false;

      state.decks.push(action.payload);

      state.isFetching = false;
      state.isCreating = true;
      state.isEditing = false;
      state.isDeleting = false;

      state.errorMessage = null;
    })
    
    .addCase(createDeck.rejected, (state) => {
      state.loading = false;
      state.errorMessage = "Please set a name for this deck";
    })

    // EDIT DECK
    .addCase(editDeck.pending, (state) => {
      state.loading = true;
      state.errorMessage = null;
    })
    .addCase(editDeck.fulfilled, (state, action) => {
      state.loading = false;

      state.decks = state.decks.map((deck) =>
        deck.id === action.payload.id ? action.payload : deck
      );

      state.isFetching = false;
      state.isCreating = false;
      state.isEditing = true;
      state.isDeleting = false;

      state.errorMessage = null;
    })
    .addCase(editDeck.rejected, (state, action) => {
      state.loading = false;
      state.errorMessage =
        action.error.message || "An error occurred while editing the deck";
    })

    // DELETE DECK
    .addCase(deleteDeck.pending, (state) => {
      state.loading = true;
      state.errorMessage = null;
    })
    .addCase(deleteDeck.fulfilled, (state, action) => {
      state.loading = false;

      state.decks = state.decks.filter((deck) => deck.id !== action.payload);

      state.isFetching = false;
      state.isCreating = false;
      state.isEditing = false;
      state.isDeleting = true;

      state.errorMessage = null;
    })
    .addCase(deleteDeck.rejected, (state, action) => {
      state.loading = false;
      state.errorMessage =
        action.error.message || "An error occurred while editing the deck";
    })

    // ON LOGOUT

    .addCase(logout, () => {
      return initialState;
    })

    // ON ACCOUNT DELETION

    .addCase(deleteUser.fulfilled, () => {
      return initialState;
    });
});

export default decksReducer;
