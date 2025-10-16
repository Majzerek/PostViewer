import React from 'react';
import { Posts } from './components/Posts';
import { Typography } from '@mui/material';

const Dashboard = () => {
  return (
    <>
      <header title="Post">
        <Typography variant="h1" textAlign={'center'} mb={4}>
          Favorite Posts Viewer
        </Typography>
      </header>
      <section>
        <Posts />
      </section>
    </>
  );
};

export const DashboardPage = React.memo(Dashboard);
