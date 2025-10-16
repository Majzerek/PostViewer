/* eslint-disable import/no-unresolved */
import { IconButton, Tooltip } from '@mui/material';
import { useFavorites } from '../../context/FavoriteContext';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
type ToogleFavoriteProps = {
  postId: number;
  author: string;
};
export const ToggleFavorite = ({ postId, author }: ToogleFavoriteProps) => {
  const { isFavorite, toggleFavorite } = useFavorites();

  const favorite = isFavorite(postId);

  return (
    <Tooltip title={favorite ? 'Usuń z ulubionych' : 'Dodaj do ulubionych'}>
      <IconButton onClick={() => toggleFavorite(postId, author)} aria-label="favorite">
        {favorite ? <FavoriteIcon color="error" /> : <FavoriteBorderIcon />}
      </IconButton>
    </Tooltip>
  );
};
