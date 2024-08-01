//! import { useState } from 'react';
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';

import Splash from './pages/Splash';

const Layout = () => {
  //TODO: this is for navbar once created
  // const [isLoaded, setIsLoaded] = useState(false);

  //TODO: add navigation bar once component is built
  return <>{<Outlet />}</>;
};

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <Splash />,
      },
    ],
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
