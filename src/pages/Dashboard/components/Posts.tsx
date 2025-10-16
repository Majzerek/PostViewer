import { Box, Button, CircularProgress, Stack, Typography } from '@mui/material';
import { apiMakeRequest } from '../../../api';
import { PostCard } from '../../../components/PostCard/PostCard';
import { useAsyncRequest } from '../../../hooks/useAsyncRequest';
import { mapPostsDtoModel, PostDtoApi } from '../../../mappers';
import { AuthorType, Post } from '../../../models';
import { useState } from 'react';

export const Posts = () => {
  const [limit, setLimit] = useState(10);

  const { data, loading, error } = useAsyncRequest<Post[]>(async (signal) => {
    const res = await apiMakeRequest<PostDtoApi[]>({
      method: 'GET',
      url: '/posts',
      signal,
    });

    return mapPostsDtoModel(res);
  }, []);
  const { data: authors } = useAsyncRequest<AuthorType[]>(async (signal) => {
    const authorsList = await apiMakeRequest<AuthorType[]>({
      method: 'GET',
      url: '/users',
      signal,
    });

    return authorsList;
  }, []);

  if (!data || !authors) {
    return (
      <Box display="flex" justifyContent="center" mt={4}>
        <CircularProgress size={47} />
      </Box>
    );
  }
  const handleLoadMore = () => {
    if (limit < data.length) {
      setLimit((prev) => prev + 10);
    }
  };

  console.log(limit);

  const PostsList: Post[] = data?.slice(0, limit);
  return (
    <>
      {error && <Button>Sprobuj ponownie</Button>}
      {!data && <Typography variant="h1">No more post</Typography>}
      <Stack direction={'column'} gap={2}>
        <Box display={'flex'} justifyContent={'center'} width={'100%'} flexWrap={'wrap'} gap={2}>
          {error && <Typography variant="h5">Try again</Typography>}
          {PostsList &&
            PostsList.map((item: Post) => (
              <PostCard
                key={item.postId}
                postId={item.postId}
                content={item.content}
                headline={item.headline}
                author={authors[item.authorId]?.name ?? ''}
                loading={loading}
              />
            ))}
        </Box>
        <Box display={'flex'} justifyContent={'center'}>
          <Button
            variant="contained"
            disabled={limit >= data.length}
            onClick={handleLoadMore}
            title={'Załaduj Wiecej'}
          >
            Load More
          </Button>
        </Box>
        {limit >= data.length && (
          <Typography align="center" color="textSecondary" mt={2}>
            Wszystkie posty zostały załadowane.
          </Typography>
        )}
      </Stack>
    </>
  );
};
