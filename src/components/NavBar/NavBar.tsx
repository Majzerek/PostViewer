import { Box, AppBar, Toolbar, useTheme, Typography } from '@mui/material';
import { ListMap } from './NavBarList/ListMap';
import { MENU_ITEMS } from './navRoute';
import { ThemeSwitch } from './ThemeSwitch';
import NavBarMenu from './NavBarMenu/NavBarMenu';

export const NavBar = () => {
  const theme = useTheme();
  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          width: '100%',
          bgcolor: theme.palette.primary.dark,
        }}
      >
        <Toolbar sx={{ display: 'flex', gap: 3 }}>
          <Typography
            variant="h6"
            sx={{ fontSize: { xs: '.8rem', sm: '1rem' } }}
            color="primary.light"
          >
            Post Viewer
          </Typography>
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
            <ListMap list={MENU_ITEMS} />
          </Box>
          <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
            <NavBarMenu />
          </Box>
          <ThemeSwitch />
        </Toolbar>
      </AppBar>
      <Box component="main" sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3 }}>
        <Toolbar />
      </Box>
    </Box>
  );
};
