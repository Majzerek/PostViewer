import { Button, Card, CardActions, CardContent, Skeleton, Typography } from '@mui/material';
import { ToggleFavorite } from '../ToggleFavorite/ToggleFavorite';
import { useNavigate } from 'react-router-dom';

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
          height: 180,
        }}
      >
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
        <CardActions sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Button
            size="small"
            title="Zaladuj Detale"
            onClick={() => navigation(`/posts/${postId}`)}
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
            <Button size="small" title="Zobacz wiecej" aria-label="Zobacz wiecej">
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
