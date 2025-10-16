import { styled } from '@mui/material';
import { PropsWithChildren } from 'react';

const Container = styled('main')(({ theme }) => ({
  padding: theme.spacing(3),
  overflowY: 'auto',
  height: '100vh',
}));

export const Main = ({ children }: PropsWithChildren) => {
  return <Container>{children}</Container>;
};
