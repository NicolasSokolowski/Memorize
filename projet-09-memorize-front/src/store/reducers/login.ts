import { createReducer } from "@reduxjs/toolkit";
import { login, logout, tokenCheck } from "../actions/login";
import { deleteUser } from "../actions/user/deleteUser";

interface LoginState {
  isLogged: boolean;
  username: string | null;
  errorMessage: string | null;
  email: string | null;
  id: number | null;
}

export const initialState: LoginState = {
  isLogged: false,
  username: null,
  email: null,
  id: null,
  errorMessage: null,
};

// When the login is fulfilled, we change the state of isLogged and assigne a new value to username and we also fetch the token from the API. This will allow the user to log into their account.
// The tokenCheck is used in the App component to keep the isLogged state to true once the check has been successful and the use will still be logged from one page to another.
const loginReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(login.fulfilled, (state, action) => {
      state.isLogged = true;
      state.username = action.payload.username;
      localStorage.setItem("accessToken", action.payload.accessToken);
      localStorage.setItem("refreshToken", action.payload.refreshToken);
      localStorage.setItem("username", action.payload.username);
      localStorage.setItem("id", action.payload.id);
    })
    .addCase(login.rejected, (state) => {
      state.errorMessage = "identifiant ou mot de passe incorrect";
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("username");
      localStorage.removeItem("id");
    })
    .addCase(logout, (state) => {
      state.username = null;
      state.isLogged = false;
      localStorage.removeItem("accessToken");
      localStorage.removeItem("username");
      localStorage.removeItem("id");
    })
    .addCase(tokenCheck, (state) => {
      const storedToken = localStorage.getItem("accessToken");
      const storedUserName = localStorage.getItem("username");

      if (storedToken && storedUserName) {
        state.isLogged = true;
      } else {
        state.isLogged = false;
      }
    })
    .addCase(deleteUser.fulfilled, () => {
      console.log("deleteUser fulfilled in login");
      return initialState;
    });
});

export default loginReducer;
