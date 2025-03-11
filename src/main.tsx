import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import { TasksListPage } from './task-manager/pages/tasks-list-page';
import { AddingTaskPage } from './task-manager/pages/adding-task-page';
import { EditingTaskPage } from './task-manager/pages/editing-task-page';
import { NotFoundPage } from './task-manager/pages/not-found-page';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
  typography: {
    fontSize: 13,
  },
});

function App(): React.ReactNode {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Routes>
          <Route path="/" element={<TasksListPage />} />
          <Route path="/add-new-task" element={<AddingTaskPage />} />
          <Route path="/edit-task/:id" element={<EditingTaskPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
};


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
