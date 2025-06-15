import { Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { TaskMateIcon } from '../../../shared/icons';
import { MenuProps } from '../types';
import { PlaylistAddCheckCircle, Widgets } from '@mui/icons-material';
import styles from './menu.module.css';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { ExitModal } from './exit-modal';

const IconStyles = {
    fontSize: 22,
    color: '#006838'
}

export const Menu = (props: MenuProps) => {
  const { isOpen, onClose } = props;

  const navigateTo = useNavigate();
  const [isExitModalVisible, setIsExitModalVisible] = useState<boolean>(false);

  const navigateToHomePage = () => {
    navigateTo("/home-page");
    onClose();
  };

  const navigateToTasksListPage = () => {
    navigateTo("/tasks-list");
    onClose();
  };

  const handleExit = (): void => {
    setIsExitModalVisible(false);
    navigateTo("/");
    onClose();
  }

  return (
    <div>
        <Drawer anchor="left" open={isOpen} onClose={onClose}>
        <div className={styles['menu__app-logo']}>
            <TaskMateIcon/>
            <div className={styles['menu__app-logo-text']}>TaskMate</div>
        </div>
        <List>
            <ListItem disablePadding>
            <ListItemButton onClick={navigateToHomePage}>
                <ListItemIcon><Widgets sx={IconStyles} /></ListItemIcon>
                <ListItemText primary="Главная страница" />
            </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
            <ListItemButton onClick={navigateToTasksListPage}>
                <ListItemIcon><PlaylistAddCheckCircle sx={IconStyles} /></ListItemIcon>
                <ListItemText primary="Список задач" />
            </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
            <ListItemButton onClick={() => setIsExitModalVisible(true)}>
                <ListItemIcon><ExitToAppIcon sx={IconStyles} /></ListItemIcon>
                <ListItemText primary="Выйти" />
            </ListItemButton>
            </ListItem>
        </List>
        </Drawer>
        <ExitModal
          isVisible={isExitModalVisible}
          onClose={() => setIsExitModalVisible(false)}
          onConfirm={handleExit}
        />
    </div>
  );
};