import { createBrowserRouter } from 'react-router-dom';
import { Dashboard, Favorite, NotFoundPage } from '../pages';
import { NavbarWrapper } from '../components/NavBar/NavBarWrapper';

export const router = createBrowserRouter([
  {
    path: '*',
    element: <NotFoundPage />,
  },
  {
    path: '/',
    element: <NavbarWrapper />,
    children: [
      {
        path: '/',
        element: <Dashboard />,
      },
      {
        path: '/favorite',
        element: <Favorite />,
      },
    ],
  },
]);
