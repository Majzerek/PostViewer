import * as React from 'react';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import { IconButton, Menu } from '@mui/material';
import { MENU_ITEMS } from '../navRoute';
import ViewWeekIcon from '@mui/icons-material/ViewWeek';
import { useLocation, useNavigate } from 'react-router-dom';

export default function NavBarMenu() {
  const navigate = useNavigate();
  const location = useLocation();

  const [openMenu, setOpenMenu] = React.useState<null | HTMLElement>(null);
  const open = Boolean(openMenu);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setOpenMenu(event.currentTarget);
  };
  const handleClose = () => {
    setOpenMenu(null);
  };

  return (
    <div>
      <Button
        id="menu-button"
        aria-controls={open ? 'nav-menu' : undefined}
        aria-haspopup="true"
        aria-label="Open Menu Navigarion"
        aria-expanded={open ? 'true' : undefined}
        variant="text"
        disableElevation
        onClick={handleClick}
      >
        <ViewWeekIcon />
      </Button>
      <Menu id="nav-menu" anchorEl={openMenu} open={open} onClose={handleClose}>
        {MENU_ITEMS.map((item) => (
          <MenuItem onClick={handleClose} disableRipple key={item.value}>
            <IconButton
              onClick={() => navigate(item.value)}
              disabled={location.pathname === item.value}
              title={item.label}
              aria-label={item.label}
            >
              {item.icon} {item.label}
            </IconButton>
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
}
