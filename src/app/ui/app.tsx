import { TasksListPage } from '../../task-manager/pages/tasks-list-page';
import { AddingTaskPage } from '../../task-manager/pages/adding-task-page';
import { EditingTaskPage } from '../../task-manager/pages/editing-task-page';
import { NotFoundPage } from '../../task-manager/pages/not-found-page';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { MainPage } from '../../task-manager/pages/main-page';
import styles from './app.module.css';

const theme = createTheme({
  palette: {
    primary: {
      main: '#830062',
    },
    secondary: {
      main: '#dc004e',
    },
  },
  typography: {
    fontFamily: 'Montserrat, Arial, sans-serif',
    fontSize: 12,
  },
});

export function App(): React.ReactElement {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <div className={styles['app']}>
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/tasks-list" element={<TasksListPage />} />
            <Route path="/new-task" element={<AddingTaskPage />} />
            <Route path="/task/:id" element={<EditingTaskPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </div>
      </Router>
    </ThemeProvider>
  );
};
