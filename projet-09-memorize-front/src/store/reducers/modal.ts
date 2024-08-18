import { createReducer } from "@reduxjs/toolkit";
import { toggleModal } from "../actions/modal";
import { logout } from "../actions/login";
import { deleteUser } from "../actions/user/deleteUser";

export interface ModalState {
  modalIsOpen: boolean;
  modalType: string | null;
}

export const initialState: ModalState = {
  modalIsOpen: false,
  modalType: null,
};

// This reducer allows us to handle the modalIsOpen state so we can reuse it throughout the app, since we are using modals multiple times
const modalReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(toggleModal, (state, action) => {
      state.modalIsOpen = !state.modalIsOpen;
      state.modalType = action.payload?.modalType;
    })

    // ON LOGOUT

    .addCase(logout, () => {
      return initialState;
    })

    // ON ACCOUNT DELETION

    .addCase(deleteUser.fulfilled, () => {
      return initialState;
    });
});

export default modalReducer;
