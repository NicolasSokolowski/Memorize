import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { getAuthHeaders, updateTokens } from "../utils.actions.js";

export const GET_ALL_CARDS = "GET_ALL_CARDS";

export const getAllCards = createAsyncThunk(GET_ALL_CARDS, async (deckId) => {
  const userId = localStorage.getItem("id");

  if (userId) {
    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}/account/${userId}/decks/${deckId}/cards`,
      getAuthHeaders()
    );
    updateTokens(response);
    return response.data;
  } else {
    console.log("Invalid deck or card id");
  }
});
