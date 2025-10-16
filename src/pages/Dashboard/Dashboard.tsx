import React from 'react';
import { Posts } from './components/Posts';
import { Typography } from '@mui/material';

const Dashboard = () => {
  return (
    <main>
      <header title="Post">
        <Typography variant="h1" textAlign={'center'} mb={4}>
          Posts
        </Typography>
      </header>
      <Posts />
    </main>
  );
};

export const DashboardPage = React.memo(Dashboard);
