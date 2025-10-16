import { Box } from '@mui/material';
import './Loader.css';

export const Loader = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <div className="loader"></div>
    </Box>
  );
};
