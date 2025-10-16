import { createBrowserRouter } from 'react-router-dom';
import { NotFoundPage } from '../pages';

export const router = createBrowserRouter([
  {
    path: '*',
    element: <NotFoundPage />,
  },
]);
