import { ThemeProvider, useMediaQuery } from '@mui/material';
import { FC, ReactNode } from 'react';
import { theme } from '../theme/theme';
import { FavoritesProvider } from './FavoriteContext';

export const ProviderContext: FC<{ children: ReactNode }> = ({ children }) => {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

  return (
    <ThemeProvider theme={theme} defaultMode={prefersDarkMode ? 'dark' : 'light'}>
      <FavoritesProvider>{children}</FavoritesProvider>
    </ThemeProvider>
  );
};
