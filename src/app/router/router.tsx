import { createBrowserRouter } from 'react-router-dom';

import { MainPage } from '../../pages/main-page';
import { TasksListPage } from '../../pages/tasks-list-page';
import { NotFoundPage } from '../../pages/not-found-page';
import { TaskPage } from '../../pages/task-page';
import { AuthPage } from '../../pages/auth-page';
import { Layout } from '../layout';

export const router = createBrowserRouter([
  {
    path: '/auth',
    element: <AuthPage />,
  },
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <MainPage /> },
      { path: '/tasks-list', element: <TasksListPage /> },
      { path: '/task/:id', element: <TaskPage /> }
    ]
  },
  {
    path: '*',
    element: <NotFoundPage />,
  },
]);