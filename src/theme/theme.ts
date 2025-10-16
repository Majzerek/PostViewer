import { createTheme } from '@mui/material';
import { darkPalette } from './palette/dark';
import { lightPalette } from './palette/light';

export const theme = createTheme({
  colorSchemes: {
    dark: {
      palette: darkPalette,
    },
    light: {
      palette: lightPalette,
    },
  },
  typography: {
    h1: {
      fontSize: 26,
      fontWeight: 500,
    },
    h2: {
      fontSize: 23,
      fontWeight: 400,
    },
    h3: {
      fontSize: 20,
      fontWeight: 400,
    },
    h4: {
      fontSize: 18,
    },
    body1: {
      fontSize: 16,
    },
    caption: {
      fontSize: 12,
      fontWeight: 400,
    },
  },

  breakpoints: {
    values: {
      xs: 0,
      sm: 426,
      md: 900,
      lg: 1200,
      xl: 1536,
    },
  },

  components: {
    MuiCssBaseline: {
      styleOverrides: {
        html: {
          scrollbarColor: '#42BBFF #1A1E30',
          scrollbarWidth: 'thin',
        },
      },
    },
  },
});
