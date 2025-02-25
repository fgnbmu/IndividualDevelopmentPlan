import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import { TasksListPage } from './task-manager/pages/tasks-list-page';
import { AddingTaskPage } from './task-manager/pages/adding-task-page';
import { EditingTaskPage } from './task-manager/pages/editing-task-page';
import { NotFoundPage } from './task-manager/pages/not-found-page';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<TasksListPage />} />
        <Route path="/add-new-task" element={<AddingTaskPage />} />
        <Route path="/edit-task/:id" element={<EditingTaskPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
};

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
