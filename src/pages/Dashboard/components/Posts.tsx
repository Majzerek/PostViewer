import { Box, Button, CircularProgress, Typography } from '@mui/material';
import { useAsyncRequest } from '../../../hooks/useAsyncRequest';
import { AuthorType, Post } from '../../../models';
import { PostSearch } from './PostSearch';
import AuthServices from '../../../services/AuthServices';

export const Posts = () => {
  const { data, loading, error, refetch } = useAsyncRequest<Post[]>(async (signal) => {
    const res = await AuthServices.getPosts(signal);
    return res;
  }, []);

  const { data: authors, refetch: refetchAuthors } = useAsyncRequest<AuthorType[]>(
    async (signal) => {
      const authorsList = await AuthServices.getAuthors(signal);
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
      <Box display="flex" justifyContent="center" mt={4}>
        <CircularProgress size={24} />
      </Box>
    );
  }

  return (
    <>
      {error && (
        <Box display="flex" justifyContent="center" mt={4}>
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
