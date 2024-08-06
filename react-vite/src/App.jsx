//! import { useState } from 'react';
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { ModalProvider, Modal } from "./context/Modal";
import { thunkAuthenticate } from "./redux/session";
import Navigation from "./components/Navigation/Navigation";
import './global.css';
import Splash from './pages/Splash';
import BoardDetails from './pages/BoardDetails';
import CardsTest from './pages/CardsTest';

const Layout = () => {
  //TODO: this is for navbar once created
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(thunkAuthenticate()).then(() => setIsLoaded(true));
  }, [dispatch]);

  //TODO: add navigation bar once component is built
  return (
    <>
      <ModalProvider>
        <Navigation />
        {isLoaded && <Outlet />}
        <Modal />
      </ModalProvider>
    </>
  );
};

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: '/',
        children: [
            {
                index: true,
                element: <Splash />,
            },
            {
                path: 'boards',
                children: [
                    {
                        path: ':id',
                        element: <BoardDetails />,
                    }

                ]
            },
            {
                path: 'cards',
                element: <CardsTest />,
            },
            ]
        }
    ]
}]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
