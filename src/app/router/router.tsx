import { createBrowserRouter } from 'react-router-dom';

import { MainPage } from '../../pages/main-page';
import { TasksListPage } from '../../pages/tasks-list-page';
import { NotFoundPage } from '../../pages/not-found-page';
import { TaskPage } from '../../pages/task-page';
import { AuthPage } from '../../pages/auth-page';
import { AuthCheck } from './auth-check';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AuthPage />,
  },
  {
    path: '/home-page',
    element: (
      // <AuthCheck>
      //   <MainPage />
      // </AuthCheck>
      <MainPage />
    ),
  },
  {
    path: '/tasks-list',
    element: (
      // <AuthCheck>
      //   <TasksListPage />
      // </AuthCheck>
      <TasksListPage />
    ),
  },
  {
    path: '/task',
    element: (
      <AuthCheck>
        <TaskPage />
      </AuthCheck>
    ),
  },
  {
    path: '/task/:id',
    element: (
      <AuthCheck>
        <TaskPage />
      </AuthCheck>
    ),
  },
  {
    path: '*',
    element: <NotFoundPage />,
  },
]);