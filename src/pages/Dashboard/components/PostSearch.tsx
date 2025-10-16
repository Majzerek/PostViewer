import { Stack, Box, Select, MenuItem, Button, Typography, CircularProgress } from '@mui/material';
import React, { useState, useMemo } from 'react';
import { InputSearch, PostCard } from '../../../components';
import { useDebounce } from '../../../hooks';
import { Post, AuthorType } from '../../../models';

type PostSearchProps = {
  posts: Post[];
  authors: AuthorType[];
  postsError: Error | null;
  postsRefetch: () => void;
};

const PostSearch = ({ posts, authors, postsError, postsRefetch }: PostSearchProps) => {
  const [searchText, setSearchText] = useState('');
  const [selectedAuthor, setSelectedAuthor] = useState<string>('');
  const debouncedSearch = useDebounce(searchText);
  const [limit, setLimit] = useState(10);

  const filteredPosts = useMemo(() => {
    let filtered = posts;

    if (selectedAuthor) {
      filtered = filtered.filter((post) => post.authorId.toString() === selectedAuthor);
    }

    if (debouncedSearch.trim()) {
      filtered = filtered.filter(
        (p) =>
          p.headline.toLowerCase().includes(debouncedSearch) ||
          p.content.toLowerCase().includes(debouncedSearch),
      );
    }

    return filtered;
  }, [posts, selectedAuthor, debouncedSearch]);

  const handleLoadMore = () => {
    if (limit < filteredPosts.length) {
      setLimit((prev) => prev + 10);
    }
  };
  if (postsError) {
    return (
      <Stack>
        <Typography align="center" color="textSecondary" mt={2}>
          <CircularProgress size={24} />
        </Typography>
        <Button variant="outlined" onClick={postsRefetch} sx={{ mx: 'auto', mb: 4 }}>
          Reload
        </Button>
      </Stack>
    );
  }
  const PostList: Post[] = filteredPosts.slice(0, limit);

  return (
    <Stack direction={'column'} gap={2}>
      <Box display="flex" gap={2} mb={2}>
        <Select
          value={selectedAuthor}
          onChange={(e) => setSelectedAuthor(e.target.value)}
          displayEmpty
          sx={{ minWidth: 200 }}
        >
          <MenuItem value="">Wszyscy autorzy</MenuItem>
          {authors.map((author) => (
            <MenuItem key={author.id} value={(author.id - 1).toString()}>
              {author.name}
            </MenuItem>
          ))}
        </Select>

        <InputSearch onChange={setSearchText} />
      </Box>

      <Box display={'flex'} justifyContent={'center'} width={'100%'} flexWrap={'wrap'} gap={2}>
        {PostList.map((item: Post) => {
          const author = authors.find((a) => a.id === item.authorId);
          return (
            <PostCard
              key={item.postId}
              postId={item.postId}
              content={item.content}
              headline={item.headline}
              author={author?.name ?? ''}
            />
          );
        })}
      </Box>
      <Stack direction="column" gap={2} alignItems="center" mt={2}>
        {limit < filteredPosts.length && (
          <Button
            variant="outlined"
            onClick={handleLoadMore}
            aria-label="Load more Posts"
            title="Load More"
          >
            Load more
          </Button>
        )}
      </Stack>
      {limit >= filteredPosts.length && (
        <Typography align="center" color="textSecondary" mt={2}>
          All posts have been loaded.
        </Typography>
      )}
    </Stack>
  );
};

export const PostSearchComponent = React.memo(PostSearch);
