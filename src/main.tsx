import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { CssBaseline } from '@mui/material';
import { ProviderContext } from './context/ProviderContext.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ProviderContext>
      <CssBaseline />
      <App />
    </ProviderContext>
  </StrictMode>,
);
