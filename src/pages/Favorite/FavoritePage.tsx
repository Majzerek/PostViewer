import { Box, Typography, Stack, Button } from '@mui/material';
import React, { useMemo } from 'react';
import { PostCard, SkeletonCard } from '../../components';
import { useFavorites } from '../../context';
import { useAuthors } from '../../hooks';
import { Post } from '../../models';
import storage from '../../services/LocalStorageController';
import { StorageKeys } from '../../types/StorageKeys';

const Favorite = () => {
  const storedPosts = storage.getItem<Post[]>(StorageKeys.POSTS) ?? [];
  const { favorites } = useFavorites();
  const { authors, loadingAuthors } = useAuthors();

  const favoritePosts = useMemo(() => {
    if (!favorites.length) return [];
    const favoriteIds = favorites.map((fav) => +fav.postId);
    return storedPosts.filter((post) => favoriteIds.includes(post.postId));
  }, [favorites, storedPosts]);

  if (!favorites?.length) {
    return (
      <Box sx={{ textAlign: 'center', mt: 4 }}>
        <Typography variant="h2" color="text.secondary">
          You don&apos;t have any favorite posts yet.
        </Typography>
      </Box>
    );
  }

  if (loadingAuthors) {
    return (
      <>
        <Box sx={{ textAlign: 'center', mt: 4 }}>
          <Typography variant="h2" color="text.secondary">
            Favorite Posts
          </Typography>
        </Box>
        <SkeletonCard skeletonValue={9} />
      </>
    );
  }
  return (
    <>
      <Box sx={{ textAlign: 'center', mb: 4 }}>
        <Typography variant="h1" color="text.main">
          Favorite Posts
        </Typography>
      </Box>
      <Stack direction={'row'} gap={2} flexWrap={'wrap'} justifyContent={'center'}>
        {favoritePosts.map((post) => {
          const author = authors.find((a) => a.id === post.authorId);
          return (
            <PostCard
              key={post.postId}
              headline={post.headline}
              content={post.content}
              postId={post.postId}
              author={author?.name ?? ''}
            />
          );
        })}
      </Stack>
      <Stack justifyContent={'center'} alignItems={'center'}>
        <Button
          variant="outlined"
          sx={{ width: '20%', mt: 2 }}
          aria-label="Clear all favorite Post"
          title="Clear All"
          onClick={() => {
            storage.clearFavorite();
            window.location.reload();
          }}
        >
          Clear All Favorite
        </Button>
      </Stack>
    </>
  );
};

export const FavoritePage = React.memo(Favorite);
