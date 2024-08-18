import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { getAuthHeaders, updateTokens } from "../utils.actions";

export const GET_USER = "GET_USER";

export const getUser = createAsyncThunk(GET_USER, async () => {
  const userId = localStorage.getItem("id");
  const response = await axios.get(
    `${import.meta.env.VITE_API_URL}/account/${userId}`,
    getAuthHeaders()
  );
  updateTokens(response);

  return response.data;
});
