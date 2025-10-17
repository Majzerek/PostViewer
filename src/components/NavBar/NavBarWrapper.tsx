import { Outlet } from 'react-router';
import { Main } from '../Main/Main';

import { NavBar } from './NavBar';
import { Container } from '@mui/material';

export const NavbarWrapper = () => {
  return (
    <Main>
      <NavBar />
      <Container maxWidth="lg">
        <Outlet />
      </Container>
    </Main>
  );
};
