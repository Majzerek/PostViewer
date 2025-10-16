import { Stack, Box, Card, CardContent, Skeleton, CardActions } from '@mui/material';

export const SkeletonCard = ({ skeletonValue }: { skeletonValue: number }) => {
  return (
    <Stack gap={2}>
      <Box
        display={'flex'}
        justifyContent={'center'}
        alignItems={'center'}
        width={'100%'}
        flexWrap={'wrap'}
        gap={2}
      >
        {[...Array(skeletonValue)].map((_, i) => (
          <Card
            key={i}
            sx={{
              width: 275,
              height: 180,
            }}
          >
            <CardContent>
              <Skeleton variant="text" width="80%" height={24} sx={{ mx: 'auto', mb: 1 }} />
              <Stack spacing={0.5} sx={{ mb: 1 }}>
                <Skeleton variant="text" width="95%" height={18} />
                <Skeleton variant="text" width="70%" height={18} />
              </Stack>
              <Skeleton variant="text" width="40%" height={14} sx={{ mt: 1 }} />
            </CardContent>
            <CardActions sx={{ display: 'flex', justifyContent: 'space-between', px: 2 }}>
              <Skeleton variant="rectangular" width={80} height={28} sx={{ borderRadius: 1 }} />
              <Skeleton variant="circular" width={28} height={28} />
            </CardActions>
          </Card>
        ))}
      </Box>
    </Stack>
  );
};
