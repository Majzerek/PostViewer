/* eslint-disable import/no-unresolved */
import { Dashboard as DashboardIcon } from '@mui/icons-material';
import SimpleBadge from './Badge';

export const MENU_ITEMS = [
  {
    label: 'Dashboard',
    value: '/',
    icon: <DashboardIcon fontSize="small" />,
  },
  {
    label: 'Favorite',
    value: '/favorite',
    icon: <SimpleBadge />,
  },
];
