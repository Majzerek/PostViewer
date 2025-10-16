import { useLocation, useNavigate } from 'react-router-dom';
import { MENU_ITEMS } from '../navRoute';
import { List, ListItemButton, Stack, Typography, useTheme } from '@mui/material';
import { FC } from 'react';

export const ListMap: FC<{ list: typeof MENU_ITEMS }> = ({ list }) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  return (
    <List sx={{ display: 'flex' }}>
      <Stack justifyItems={'center'} direction={'row'} gap={1}>
        {list.map((item) => (
          <ListItemButton
            key={item.label}
            sx={
              item.value === location.pathname
                ? {
                    color: theme.palette.primary.main,
                    '&:hover': {
                      bgcolor: 'transparent',
                      color: `${theme.palette.primary.light}`,
                    },
                  }
                : {
                    '&:hover': {
                      bgcolor: 'transparent',
                      color: `${theme.palette.primary.light}`,
                    },
                  }
            }
            onClick={() => navigate(`/${item.value}`)}
          >
            <Typography
              variant="body1"
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 0.5,
                fontSize: { xs: '.8rem', sm: '1rem' },
              }}
            >
              {item.icon} {item.label}
            </Typography>
          </ListItemButton>
        ))}
      </Stack>
    </List>
  );
};
