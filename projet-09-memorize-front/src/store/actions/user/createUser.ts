import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const CREATE_USER = "CREATE_USER";

export const createUser = createAsyncThunk(CREATE_USER, async (userData) => {
  const response = await axios.post(
    `${import.meta.env.VITE_API_URL}/account/`,
    userData
  );
  console.log(response.data.newUser);
  return response.data;
});
