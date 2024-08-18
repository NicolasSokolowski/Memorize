import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store/index.ts";
import App from "./components/App/App.tsx";
import Decks from "./components/Decks/index.tsx";
import Home from "./components/Home/index.tsx";
import Cards from "./components/Cards/index.tsx";
import Profile from "./components/Profile/index.tsx";
import Error from "./components/Error/index.tsx";
import TrainingSession from "./components/TrainingSession/index.tsx";
import { CheckAuthentication } from "./components/CheckAuthentication";

import "./index.scss";

// Setting up the router with App as the Root element to have a fixed header and footer on all pages and the children will be inserted in Outlet depending on the URL accessed

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <Error />,

    children: [
      { index: true, element: <Home /> },
      { path: "/decks", element: <Decks /> },
      { path: "/decks/:deckId", element: <Cards /> }, // (user_id)
      { path: "/profile", element: <Profile /> },
      { path: "/decks/:deckId/trainingsession", element: <TrainingSession />},
    ],
  },
]);

// Added the Provider for the store, so all the states set can be accessed throughout the app. 
// Added the RouterProvider so the App can be configured as a Single Page Application with React Router
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
