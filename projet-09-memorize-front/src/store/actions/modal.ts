import { createAction } from "@reduxjs/toolkit";

export const TOGGLE_MODAL = "TOGGLE MODAL";

// We create an action to toggle the modal
export const toggleModal = createAction(TOGGLE_MODAL);
