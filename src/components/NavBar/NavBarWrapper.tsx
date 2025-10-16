import { Outlet } from 'react-router';
import { Main } from '../Main/Main';
// eslint-disable-next-line import/no-unresolved
import { NavBar } from './NavBar';

export const NavbarWrapper = () => {
  return (
    <Main>
      <NavBar />
      <Outlet />
    </Main>
  );
};
