import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { getAuthHeaders, updateTokens } from "../utils.actions.js";

export const DELETE_CARD = "DELETE_CARD";

export const deleteCard = createAsyncThunk(
  DELETE_CARD,

  async ({ deckId, cardId }) => {
    const userId = localStorage.getItem("id");

    if (userId) {
      const response = await axios.delete(
        `${
          import.meta.env.VITE_API_URL
        }/account/${userId}/decks/${deckId}/cards/${cardId}`,
        getAuthHeaders()
      );
      updateTokens(response);
      console.log(response);
      console.log("Hello: ", response.data);

      return response.data;
    } else {
      console.log("userId est null ou undefined");
    }
  }
);
