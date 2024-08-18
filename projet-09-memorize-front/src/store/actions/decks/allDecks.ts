import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { getAuthHeaders, updateTokens } from "../utils.actions.js";

export const GET_ALL_DECKS = "GET_ALL_DECKS";

export const getAllDecks = createAsyncThunk(GET_ALL_DECKS, async () => {
  const userId = localStorage.getItem("id");

  if (userId) {
    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}/account/${userId}/decks`,
      getAuthHeaders()
    );
    updateTokens(response);
    return response.data;
  } else {
    console.log("userId is null or undefined");
  }
});
