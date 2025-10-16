import { Card, CardContent, Typography, CardActions, Button, Skeleton, Stack } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { ToggleFavorite } from '../ToggleFavorite/ToggleFavorite';

type PostCardProps = {
  headline: string;
  content: string;
  author: string;
  postId: number;
  loading?: boolean;
};
export const PostCard = ({ headline, content, author, postId, loading }: PostCardProps) => {
  const navigation = useNavigate();
  return (
    <>
      <Card
        sx={{
          maxWidth: 275,
          height: 200,
        }}
        data-testid="post-card"
      >
        <Stack direction={'column'} justifyContent={'space-between'}>
          <CardContent>
            <Typography
              gutterBottom
              sx={{
                color: 'text.secondary',
                fontWeight: 'bold',
                fontSize: 14,
                textAlign: 'center',
              }}
            >
              {headline.length > 25
                ? `${headline.slice(0, 25).toUpperCase()}...`
                : `${headline.toUpperCase()}`}
            </Typography>
            <Typography variant="body2">
              {content.length > 40 ? `${content.slice(0, 40)}...` : `${content}`}
            </Typography>
            <Typography variant="caption" fontWeight={'bold'} mt={2}>
              {author}
            </Typography>
          </CardContent>
        </Stack>
        <CardActions sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Button
            size="small"
            title="Load Details"
            onClick={() => navigation(`/posts/${postId}`)}
            aria-label="Load Details info about Post"
            data-testid="load-details-post"
          >
            Learn More
          </Button>
          <ToggleFavorite postId={postId} author={author} />
        </CardActions>
      </Card>
      {loading ? (
        <Card sx={{ maxWidth: 275 }}>
          <Skeleton variant="text" width={200} />
          <Skeleton variant="text" width={275} />
          <Skeleton variant="text" width={150} />
          <CardActions sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Button size="small" title="See more" aria-label="See more details">
              Learn More
            </Button>
            <ToggleFavorite postId={postId} author={author} />
          </CardActions>
        </Card>
      ) : (
        ''
      )}
    </>
  );
};
