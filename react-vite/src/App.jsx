// src/App.jsx
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { ModalProvider, Modal } from './context/Modal';
import { thunkAuthenticate } from './redux/session';
import Navigation from './components/Navigation/Navigation';
import Footer from './components/Footer/Footer';
import './global.css';
import Splash from './pages/Splash';
import BoardDetails from './pages/BoardDetails';

const Layout = () => {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(thunkAuthenticate()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <div className="page-container">
      <ModalProvider>
        <Navigation isLoaded={isLoaded} />
        <div className="content-wrap">
          {isLoaded && <Outlet />}
        </div>
        <Footer />
        <Modal />
      </ModalProvider>
    </div>
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
              },
            ],
          },
        ],
      },
    ],
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
