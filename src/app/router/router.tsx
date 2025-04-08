import { createBrowserRouter } from 'react-router-dom';

import { MainPage } from '../../pages/main-page';
import { TasksListPage } from '../../pages/tasks-list-page';
import { AddingTaskPage } from '../../pages/adding-task-page';
import { EditingTaskPage } from '../../pages/editing-task-page';
import { NotFoundPage } from '../../pages/not-found-page';


// export const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <MainPage />,
//     children: [
//       { path: "/tasks-list", element: <TasksListPage /> },
//       { path: "/new-task", element: <AddingTaskPage /> },
//       { path: "/task/:id", element: <EditingTaskPage /> },
//     ],
//   },
//   {
//     path: "*",
//     element: <NotFoundPage />,
//   }
// ]);

export const router = createBrowserRouter([
    {
      path: '/',
      element: <MainPage />,
    },
    {
      path: '/tasks-list',
      element: <TasksListPage />,
    },
    {
      path: '/new-task',
      element: <AddingTaskPage />,
    },
    {
      path: '/task/:id',
      element: <EditingTaskPage />,
    },
    {
      path: '*',
      element: <NotFoundPage />,
    },
  ]);