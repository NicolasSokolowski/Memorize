import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { getAuthHeaders, updateTokens } from "../utils.actions.js";

export const EDIT_CARD = "EDIT_CARD";

export const editCard = createAsyncThunk(
  EDIT_CARD,
  async ({ deckId, cardId, updatedCard }) => {
    const userId = localStorage.getItem("id");

    if (userId) {
      const response = await axios.patch(
        `${
          import.meta.env.VITE_API_URL
        }/account/${userId}/decks/${deckId}/cards/${cardId}`,
        updatedCard,
        getAuthHeaders()
      );
      updateTokens(response);
      console.log(response);
      console.log("Hello: ", response.data);

      return response.data;
    } else {
      console.log("updatedCard is null or undefined");
    }
  }
);
