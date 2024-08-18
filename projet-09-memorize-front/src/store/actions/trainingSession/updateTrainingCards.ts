import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { getAuthHeaders, updateTokens } from "../utils.actions";

export const UPDATE_DIFFICULTIES = "UPDATE_DIFFICULTIES";

export const updateTrainingCards = createAsyncThunk<any, string>(
  UPDATE_DIFFICULTIES,
  async ({ deckId, updatedDifficulties }) => {
    console.log(deckId, updatedDifficulties);
    const userId = localStorage.getItem("id");

    if (userId) {
      const response = await axios.patch(
        `${
          import.meta.env.VITE_API_URL
        }/account/${userId}/decks/${deckId}/cards/update-difficulties`,
        updatedDifficulties,
        getAuthHeaders()
      );
      updateTokens(response);
      console.log(response.data);
      return response.data;
    } else {
      console.log("There was an error fecthing the data.");
    }
  }
);
