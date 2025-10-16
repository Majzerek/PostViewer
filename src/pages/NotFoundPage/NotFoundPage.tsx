import { Button, Container, Stack, Typography } from '@mui/material';

export const NotFoundPage = () => {
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
        <Button variant="contained">Back</Button>
      </Stack>
    </Container>
  );
};
