import { useState } from 'react';
import { AppBar, Toolbar, IconButton, Tooltip } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Menu } from '../../../features/menu';
import styles from './header.module.css';
import { Add } from '@mui/icons-material';
import { Link, useNavigate } from 'react-router-dom';

const HeaderIcon = {
  fontSize: 30,
}

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const navigateTo = useNavigate();

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
          <MenuIcon sx={HeaderIcon} />
        </IconButton>
        <div className={styles['header']}>
          <Link to="/" className={styles['header__app-name']}>TaskMate</Link>
          <Tooltip title='Добавить задачу'>
            <IconButton color="inherit" onClick={() => navigateTo("/task/new")}><Add sx={HeaderIcon}/></IconButton>
          </Tooltip>
        </div>
      </Toolbar>
      <Menu isOpen={isMenuOpen} onClose={handleCloseMenu} />
    </AppBar>
  );
};