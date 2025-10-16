import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Skeleton,
  Stack,
  Typography,
} from '@mui/material';
import { useAsyncRequest } from '../../../hooks/useAsyncRequest';
import { AuthorType, Post } from '../../../models';
import { PostSearch } from './PostSearch';
import AuthServices from '../../../services/AuthServices';
import storage from '../../../services/LocalStorageController';
import { StorageKeys } from '../../../types/StorageKeys';

export const Posts = () => {
  const { data, loading, error, refetch } = useAsyncRequest<Post[]>(async (signal) => {
    const res = await AuthServices.getPosts(signal);
    storage.setItem<Post[]>(StorageKeys.POSTS, res);
    return res;
  }, []);

  const { data: authors, refetch: refetchAuthors } = useAsyncRequest<AuthorType[]>(
    async (signal) => {
      const authorsList = await AuthServices.getAuthors(signal);
      storage.setItem<AuthorType[]>(StorageKeys.AUTHORS, authorsList);
      return authorsList;
    },
    [],
  );

  const reload = () => {
    try {
      refetch();
      refetchAuthors();
    } catch (err) {
      console.warn(err);
    }
  };
  if (loading || !data || !authors) {
    return (
      <Stack gap={2}>
        <PostSearch posts={[]} authors={[]} />

        <Box
          display={'flex'}
          justifyContent={'center'}
          alignItems={'center'}
          width={'100%'}
          flexWrap={'wrap'}
          gap={2}
        >
          {[...Array(9)].map((_, i) => (
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
  }

  return (
    <>
      {error && (
        <Box display="flex" justifyContent="center" mt={4}>
          <PostSearch posts={data} authors={authors} />
          <Button variant="contained" onClick={reload}>
            Try Again
          </Button>
        </Box>
      )}
      {data.length === 0 && <Typography variant="h6">There are no posts!</Typography>}
      <PostSearch posts={data} authors={authors} />
    </>
  );
};
