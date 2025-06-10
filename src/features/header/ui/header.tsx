import { useState } from 'react';
import { AppBar, Toolbar, Typography, IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Menu } from '../../menu';

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  const handleOpenMenu = () => {
    setIsMenuOpen(true);
  };

  const handleCloseMenu = () => {
    setIsMenuOpen(false);
  }

  return (
    <AppBar position="fixed" elevation={4}>
      <Toolbar>
        <IconButton edge="start" color="inherit" aria-label="menu" onClick={handleOpenMenu}>
          <MenuIcon sx={{ fontSize: 30 }} />
        </IconButton>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          TaskMate
        </Typography>
      </Toolbar>
      <Menu isOpen={isMenuOpen} onClose={handleCloseMenu} />
    </AppBar>
  );
};