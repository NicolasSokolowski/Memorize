import { Navigate } from "react-router-dom";
import { ReactNode } from "react";

// Created a tokenCheck function, unused for now.
export function CheckAuthentication(element: ReactNode) {
  const accessToken = localStorage.getItem("accessToken");
  return accessToken ? element : <Navigate to="/" />;
}
