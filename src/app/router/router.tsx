import { createBrowserRouter } from 'react-router-dom';

import { MainPage } from '../../pages/main-page';
import { TasksListPage } from '../../pages/tasks-list-page';
import { NotFoundPage } from '../../pages/not-found-page';
import { TaskPage } from '../../pages/task-page';
import { AuthPage } from '../../pages/auth-page';
import { AuthCheck } from './auth-check';
import { Header } from '../../features/header';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AuthPage />,
  },
  {
    path: '/home-page',
    element: (
      <AuthCheck>
        <Header/>
        <MainPage />
      </AuthCheck>
    ),
  },
  {
    path: '/tasks-list',
    element: (
      <AuthCheck>
        <Header/>
        <TasksListPage />
      </AuthCheck>
    ),
  },
  {
    path: '/task',
    element: (
      <AuthCheck>
        <Header/>
        <TaskPage />
      </AuthCheck>
    ),
  },
  {
    path: '/task/:id',
    element: (
      <AuthCheck>
        <Header/>
        <TaskPage />
      </AuthCheck>
    ),
  },
  {
    path: '*',
    element: <NotFoundPage />,
  },
]);