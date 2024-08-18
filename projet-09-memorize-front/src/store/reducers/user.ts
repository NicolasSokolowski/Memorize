import { createReducer } from "@reduxjs/toolkit";
import { createUser } from "../actions/user/createUser.js";
import { getUser } from "../actions/user/getUser.js";
import { updatePassword, updateUser } from "../actions/user/updateUser.js";
import { deleteUser } from "../actions/user/deleteUser.js";
import { login, logout } from "../actions/login.js";

interface userState {
  username: string | null;
  email: string | null;
  id: number | null;
  loading: boolean;
  errorMessage: string | null;
}

const initialState: userState = {
  username: null,
  email: null,
  id: null,
  loading: false,
  errorMessage: null,
};

const createUserReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(createUser.pending, (state) => {
      state.loading = true;
      state.errorMessage = null;
    })
    .addCase(createUser.fulfilled, (state) => {
      state.loading = false;
      state.errorMessage = null;
    })
    .addCase(createUser.rejected, (state) => {
      state.loading = false;
      state.errorMessage = "user not found";
    })

    // ON LOGIN

    .addCase(login.fulfilled, (state, action) => {
      state.username = action.payload.username;
      state.email = action.payload.email;
    })

    // ON LOGOUT

    .addCase(logout, () => {
      return initialState;
    })

    // GET USER

    .addCase(getUser.pending, (state) => {
      state.loading = true;
      state.errorMessage = null;
    })
    .addCase(getUser.fulfilled, (state, action) => {
      state.loading = false;
      state.errorMessage = null;
      state.username = action.payload.username;
      state.email = action.payload.email;
    })
    .addCase(getUser.rejected, (state) => {
      state.loading = false;
      state.errorMessage = "User not found";
    })

    // UPDATE USER
    .addCase(updateUser.pending, (state) => {
      state.loading = true;
      state.errorMessage = null;
    })
    .addCase(updateUser.fulfilled, (state, action) => {
      state.loading = false;
      state.errorMessage = null;
      state.username = action.payload.username;
      state.email = action.payload.email;
    })
    .addCase(updateUser.rejected, (state) => {
      state.loading = false;
      state.errorMessage = "Failed to update user email or username";
    })

    // UPDATE PASSWORD
    .addCase(updatePassword.pending, (state) => {
      state.loading = true;
      state.errorMessage = null;
    })
    .addCase(updatePassword.fulfilled, (state) => {
      state.loading = false;
      state.errorMessage = null;
    })
    .addCase(updatePassword.rejected, (state) => {
      state.loading = false;
      state.errorMessage = "Failed to update user password";
    })

    // DELETE USER

    .addCase(deleteUser.pending, (state) => {
      state.loading = true;
      state.errorMessage = null;
    })
    .addCase(deleteUser.fulfilled, () => {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("id");
      return initialState;
    })
    .addCase(deleteUser.rejected, (state) => {
      state.loading = false;
      state.errorMessage = "Failed to delete user";
    });
});

export default createUserReducer;
