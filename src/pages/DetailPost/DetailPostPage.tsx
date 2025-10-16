import { Box, Button, Skeleton, Stack, Typography } from '@mui/material';
import storage from '../../services/LocalStorageController';
import { AuthorType, CommentsType, Post } from '../../models';
import { Link, useParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { ToggleFavorite } from '../../components/ToggleFavorite/ToggleFavorite';
import { StorageKeys } from '../../types/StorageKeys';
import { useAsyncRequest } from '../../hooks/useAsyncRequest';
import AuthServices from '../../services/AuthServices';

const DetailPost = () => {
  const StorageList = storage.getItem<Post[]>(StorageKeys.POSTS);
  const AuthorsList = storage.getItem<AuthorType[]>(StorageKeys.AUTHORS);
  const [postList] = useState<Post[]>(StorageList ? StorageList : []);
  const [authorsList] = useState<AuthorType[]>(AuthorsList ? AuthorsList : []);
  const [detailPost, setDetailPost] = useState<Post | null>(null);
  if (!postList)
    return (
      <Box>
        <Typography textAlign={'center'} variant="h3">
          Something went wrong!
        </Typography>
      </Box>
    );
  const { postId } = useParams<{ postId: string }>();

  useEffect(() => {
    const filterPost = () => {
      const DetailPost = postList.filter((post) => post.postId === Number(postId));
      setDetailPost(DetailPost[0]);
      return DetailPost;
    };

    filterPost();
  }, [postId, postList]);

  const {
    data: comments,
    loading,
    error,
    refetch,
  } = useAsyncRequest<CommentsType[]>(
    async (signal) => {
      if (!postId) return [];
      const res = await AuthServices.getComments(+postId, signal);
      return res;
    },
    [postId],
  );

  if (!detailPost)
    return (
      <Typography variant="h1" sx={{ textAlign: 'center', fontWeight: 'bold' }}>
        Post do not exist!
      </Typography>
    );

  return (
    <>
      <Stack gap={4} sx={{ bgcolor: 'secondary.main', borderRadius: 5, p: 4 }}>
        <Box sx={{ ml: 'auto' }}>
          <ToggleFavorite
            postId={detailPost.postId}
            author={authorsList[detailPost.authorId].name}
          />
        </Box>
        <Typography variant="h1" sx={{ textAlign: 'center', fontWeight: 'bold' }}>
          {detailPost.headline.toUpperCase()}
        </Typography>
        <Box>
          <Typography variant="h2">{detailPost.content}</Typography>
        </Box>
        <Typography variant="h5" color="primary">
          {authorsList[detailPost.authorId].name}
        </Typography>
        <Box sx={{ mt: 2 }}>
          <Typography variant="h6" gutterBottom>
            Comments:
          </Typography>

          {loading && (
            <Stack gap={2}>
              {[...Array(3)].map((_, i) => (
                <Box key={i} data-testid="comment-skeleton">
                  <Skeleton variant="text" width="60%" height={30} />
                  <Skeleton variant="rectangular" height={60} sx={{ borderRadius: 1 }} />
                </Box>
              ))}
            </Stack>
          )}
          {error && (
            <Typography color="error" mt={2}>
              Failed to fetch comments.{' '}
              <Button
                size="small"
                onClick={refetch}
                title="Try Again button"
                aria-label="Try again button after comments failed to load."
              >
                Try again
              </Button>
            </Typography>
          )}

          {!loading && comments && (
            <Stack mt={2} gap={2}>
              {comments.length > 0 ? (
                comments.map((comment) => (
                  <Box
                    key={comment.id}
                    sx={{
                      bgcolor: 'background.paper',
                      p: 2,
                      borderRadius: 2,
                      boxShadow: 1,
                    }}
                  >
                    <Typography variant="subtitle1" fontWeight="bold" data-testid="comment">
                      {comment.name.toUpperCase()}
                    </Typography>
                    <Typography variant="body2">{comment.body}</Typography>
                    <Typography variant="caption" color="text.secondary">
                      {comment.email}
                    </Typography>
                  </Box>
                ))
              ) : (
                <Typography variant="body2" color="text.secondary">
                  No Comments.
                </Typography>
              )}
            </Stack>
          )}
        </Box>
        <Box sx={{ mx: 'auto' }}>
          <Link to={'/'}>
            <Button
              title="Back"
              aria-label="Back to main page."
              variant="contained"
              color="primary"
            >
              Back{' '}
            </Button>
          </Link>
        </Box>
      </Stack>
    </>
  );
};

export const DetailPosPage = React.memo(DetailPost);
