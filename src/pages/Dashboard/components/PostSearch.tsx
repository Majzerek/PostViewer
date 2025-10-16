import { AuthorType, Post } from '../../../models';
import { Stack, Box, MenuItem, Select, TextField, Typography, Button } from '@mui/material';
import { PostCard } from '../../../components/PostCard/PostCard';
import { useEffect, useMemo, useState } from 'react';
type PostSearchProps = {
  posts: Post[];
  authors: AuthorType[];
};
export const PostSearch = ({ posts, authors }: PostSearchProps) => {
  const [searchText, setSearchText] = useState('');
  const [selectedAuthor, setSelectedAuthor] = useState<string>('');
  const [debouncedSearchText, setDebouncedSearchText] = useState('');
  const [limit, setLimit] = useState(10);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchText(searchText);
    }, 300);

    return () => {
      clearTimeout(handler);
    };
  }, [searchText]);

  const filteredPosts = useMemo(() => {
    let filtered = posts;

    if (selectedAuthor) {
      filtered = filtered.filter((p) => p.authorId.toString() === selectedAuthor);
    }

    if (debouncedSearchText.trim()) {
      const lowerSearch = debouncedSearchText.toLowerCase();
      filtered = filtered.filter(
        (p) =>
          p.headline.toLowerCase().includes(lowerSearch) ||
          p.content.toLowerCase().includes(lowerSearch),
      );
    }

    return filtered;
  }, [posts, selectedAuthor, debouncedSearchText]);

  const handleLoadMore = () => {
    if (limit < filteredPosts.length) {
      setLimit((prev) => prev + 10);
    }
  };
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

        <TextField
          placeholder="Szukaj po tytule lub treści..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          fullWidth
        />
      </Box>

      <Box display={'flex'} justifyContent={'center'} width={'100%'} flexWrap={'wrap'} gap={2}>
        {PostList.map((item: Post) => (
          <PostCard
            key={item.postId}
            postId={item.postId}
            content={item.content}
            headline={item.headline}
            author={authors[item.authorId]?.name ?? ''}
          />
        ))}
      </Box>
      <Stack direction="column" gap={2} alignItems="center" mt={2}>
        {limit < filteredPosts.length && (
          <Button variant="outlined" onClick={handleLoadMore}>
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
