import { createAction, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const LOGIN = "LOGIN";
export const LOGOUT = "LOGOUT";
export const TOKEN_CHECK = "TOKEN_CHECK";

export const logout = createAction(LOGOUT);
export const tokenCheck = createAction(TOKEN_CHECK);


export const login = createAsyncThunk(LOGIN, async (formData) => {
  const response = await axios.post(
    `${import.meta.env.VITE_API_URL}/auth/`,
    formData
  );

  axios.defaults.headers.common[
    "authorization"
  ] = `Bearer: ${response.data.accessToken}`;

  console.log("Response from login action:", response.data);
  return response.data;
});
