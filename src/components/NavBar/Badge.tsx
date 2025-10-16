import Badge from '@mui/material/Badge';
// eslint-disable-next-line import/no-unresolved
import { Favorite as FavoriteIcon } from '@mui/icons-material';
import { useFavorites } from '../../context/FavoriteContext';

export default function SimpleBadge() {
  const { favorites } = useFavorites();

  return (
    <Badge badgeContent={favorites.length} color="primary">
      <FavoriteIcon color="action" />
    </Badge>
  );
}
