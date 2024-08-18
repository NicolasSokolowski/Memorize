import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { Deck } from "../../reducers/decks";
import { getAuthHeaders, updateTokens } from "../utils.actions.js";

export const CREATE_DECK = "CREATE_DECK";

export const createDeck = createAsyncThunk<any, Partial<Deck>>(
  CREATE_DECK,
  async (newDeck) => {
    const userId = localStorage.getItem("id");

    if (userId) {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/account/${userId}/decks`,
        newDeck,
        getAuthHeaders()
      );
      updateTokens(response);
      return response.data;
    } else {
      console.log("userId est null ou undefined");
    }
  }
);
