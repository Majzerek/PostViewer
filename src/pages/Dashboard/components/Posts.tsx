import { Box, Button, Typography } from '@mui/material';
import { useAsyncRequest } from '../../../hooks/useAsyncRequest';
import { Post } from '../../../models';
import { PostSearchComponent } from './PostSearch';

import { SkeletonCard } from '../../../components';
import { useAuthors } from '../../../hooks';
import ApiServices from '../../../services/ApiServices';

export const Posts = () => {
  const {
    data: posts,
    loading,
    error: postsError,
    refetch,
  } = useAsyncRequest<Post[]>(async (signal) => {
    const res = await ApiServices.getPosts(signal);
    return res;
  }, []);

  const { authors, loadingAuthors, refetchAuthors } = useAuthors();

  const reload = () => {
    try {
      refetch();
      refetchAuthors();
    } catch (err) {
      console.warn(err);
    }
  };

  if (loading || !posts || !authors || loadingAuthors) {
    return (
      <>
        <PostSearchComponent
          posts={[]}
          authors={[]}
          postsError={postsError}
          postsRefetch={refetch}
        />
        <SkeletonCard skeletonValue={10} />
      </>
    );
  }

  return (
    <>
      {postsError && (
        <Box display="flex" justifyContent="center" mt={4}>
          <PostSearchComponent
            posts={posts}
            authors={authors}
            postsError={postsError}
            postsRefetch={refetch}
          />
          <Button variant="contained" onClick={reload}>
            Try Again
          </Button>
        </Box>
      )}
      {posts.length === 0 && <Typography variant="h6">There are no posts!</Typography>}
      <PostSearchComponent
        posts={posts}
        authors={authors}
        postsError={postsError}
        postsRefetch={refetch}
      />
    </>
  );
};
