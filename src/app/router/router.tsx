import { createBrowserRouter } from 'react-router-dom';

import { MainPage } from '../../pages/main-page';
import { TasksListPage } from '../../pages/tasks-list-page';
import { NotFoundPage } from '../../pages/not-found-page';
import { TaskPage } from '../../pages/task-page';
import { AuthPage } from '../../pages/auth-page';


export const router = createBrowserRouter([
    {
      path: '/',
      element: <AuthPage />,
    },
    {
      path: '/tasks-list',
      element: <TasksListPage />,
    },
    {
      path: '/task',
      element: <TaskPage />,
    },
    {
      path: '/task/:id',
      element: <TaskPage />,
    },
    {
      path: '*',
      element: <NotFoundPage />,
    },
  ]);