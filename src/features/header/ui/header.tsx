import { useState } from 'react';
import { AppBar, Toolbar, IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Menu } from '../../menu';
import styles from './header.module.css';

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
        <div className={styles['header__app-name']}>TaskMate</div>
      </Toolbar>
      <Menu isOpen={isMenuOpen} onClose={handleCloseMenu} />
    </AppBar>
  );
};