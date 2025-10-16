import { ThemeProvider, useMediaQuery } from '@mui/material';
import { FC, ReactNode } from 'react';
import { theme } from '../theme/theme';

export const ProviderContext: FC<{ children: ReactNode }> = ({ children }) => {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

  return (
    <ThemeProvider theme={theme} defaultMode={prefersDarkMode ? 'dark' : 'light'}>
      {children}
    </ThemeProvider>
  );
};
