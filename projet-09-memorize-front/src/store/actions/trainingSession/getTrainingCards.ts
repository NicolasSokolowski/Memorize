import { createAction, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { Card } from "../../reducers/trainingSession";
import { getAuthHeaders, updateTokens } from "../utils.actions";

export const GET_ALL_TRAINING_CARDS = "GET_ALL_TRAINING_CARDS";
export const SET_CURRENT_DIFFICULTY = "SET_CURRENT_DIFFICULTY";
export const NEW_CARD_ARRAY = "NEW_CARD_ARRAY";

export const getAllTrainingCards = createAsyncThunk<any, string>(
  GET_ALL_TRAINING_CARDS,
  async (deckId) => {
    const userId = localStorage.getItem("id");

    if (userId) {
      const response = await axios.get(
        `${
          import.meta.env.VITE_API_URL
        }/account/${userId}/decks/${deckId}/cards`,
        getAuthHeaders()
      );
      updateTokens(response);

      return response.data;
    } else {
      console.log("There was an error fecthing the data.");
    }
  }
);

export const setCurrentDifficulty = createAction<Card>(SET_CURRENT_DIFFICULTY);
export const newCardArray = createAction<Card>(NEW_CARD_ARRAY);
