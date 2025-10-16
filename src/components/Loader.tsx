import { Box, CircularProgress } from '@mui/material';

export const Loader = () => {
  return (
    <Box width={'100%'} height={'100%'} justifyContent={'center'} alignItems={'center'}>
      <CircularProgress size={'big'} />
    </Box>
  );
};
