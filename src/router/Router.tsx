import { createBrowserRouter } from 'react-router-dom';
import { DashboardPage, Favorite, NotFoundPage } from '../pages';
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
        element: <DashboardPage />,
      },
      {
        path: '/favorite',
        element: <Favorite />,
      },
    ],
  },
]);
