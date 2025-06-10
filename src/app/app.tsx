import React from 'react';
import { RouterProvider } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import './app.css';
import { theme } from '../shared/config/theme/lib/constants';
import { router } from './router';
import { Header } from '../features/header';

export const App = (): React.ReactElement => {
  return (
    <ThemeProvider theme={theme}>
      <Header/>
      <RouterProvider router={router} />
    </ThemeProvider>
  );
};
