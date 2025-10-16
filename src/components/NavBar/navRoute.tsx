// eslint-disable-next-line import/no-unresolved
import { Dashboard as DashboardIcon, Favorite as FavoriteIcon } from '@mui/icons-material';

export const MENU_ITEMS = [
  {
    label: 'Dashboard',
    value: '/',
    icon: <DashboardIcon fontSize="small" />,
  },
  {
    label: 'Favorite',
    value: '/favorite',
    icon: <FavoriteIcon fontSize="small" />,
  },
];
