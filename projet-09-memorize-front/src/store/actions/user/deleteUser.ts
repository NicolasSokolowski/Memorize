import { createAsyncThunk } from "@reduxjs/toolkit";

import axios from "axios";
import { getAuthHeaders } from "../utils.actions";

export const DELETE_USER = "DELETE_USER";

export const deleteUser = createAsyncThunk(DELETE_USER, async () => {
  try {
    const userId = localStorage.getItem("id");
    const response = await axios.delete(
      `${import.meta.env.VITE_API_URL}/account/${userId}`,
      getAuthHeaders()
    );
    console.log(response);
    return response.data;
  } catch (err) {
    console.log(err);
  }
});
