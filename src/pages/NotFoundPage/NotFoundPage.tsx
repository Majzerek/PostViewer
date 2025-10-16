import { Button, Container, Stack, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export const NotFoundPage = () => {
  const navigation = useNavigate();
  return (
    <Container maxWidth="lg">
      <Stack
        direction="column"
        spacing={2}
        sx={{
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '100vh',
        }}
      >
        <Typography variant="h1" color="primary">
          404 - Not Found Page
        </Typography>
        <Button variant="contained" onClick={() => navigation('/')}>
          Back
        </Button>
      </Stack>
    </Container>
  );
};
