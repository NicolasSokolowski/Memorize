import { Outlet } from "react-router-dom";
import { useEffect } from "react";
import { tokenCheck } from "../../store/actions/login";
import { useAppDispatch } from "../../hooks/redux";

import Footer from "../Footer";
import Header from "../Header";
import Modal from "react-modal";

function App() {
  Modal.setAppElement("#root");

  // We use out tokenCheck action from our store to check that the user does have a token at each render of the app.

  // We use out tokenCheck action from our store to check that the user does have a token at each render of the app.
  const dispatch = useAppDispatch();

  useEffect(() => {
    const fetchTokenCheck = async () => {
      try {
        await dispatch(tokenCheck());
      } catch (error) {
        console.log(error);
      }
    };
    fetchTokenCheck();
  }, [dispatch]);

  // With React Router, we use App as the root element. The components Header and Footer will be common to all the pages and Outlet will allow the app to insert the component to render per URL

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex flex-col container 
      mx-auto p-4 flex-grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default App;
