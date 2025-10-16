import { Box, Container } from '@mui/material';
import './Loader.css';

export const Loader = () => {
  return (
    <Container maxWidth={'lg'}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <div className="loader"></div>
      </Box>
    </Container>
  );
};
