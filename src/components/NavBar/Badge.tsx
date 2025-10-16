import Badge from '@mui/material/Badge';

import { Favorite as FavoriteIcon } from '@mui/icons-material';
import { useFavorites } from '../../context/FavoriteContext';

export default function SimpleBadge() {
  const { favorites } = useFavorites();

  return (
    <Badge badgeContent={favorites.length} color="primary" data-testid="fav-badge">
      <FavoriteIcon color="action" />
    </Badge>
  );
}
