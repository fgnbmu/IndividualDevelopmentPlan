import React from "react";

import { $tasksList } from "../../../model/tasks-list";
import { useUnit } from "effector-react";
import { Button } from "@mui/material";

export function TasksListPage(): React.ReactElement {
  const tasksList = useUnit($tasksList);

  const deleteAllTasks = (): void => {
    localStorage.removeItem('tasksList');
  }

  return (
    <div>
      Список задач
      {tasksList.length === 0 ? (
        <p>Нет задач для отображения</p>
      ) : (
        <ul>
          {tasksList.map((task, index) => (
            <li key={index}>
              {task.id}: {task.title} - {task.date} - {task.description} - {task.status}
            </li>
          ))}
        </ul>
      )}
      <Button onClick={deleteAllTasks}>Удалить все задачи</Button>
    </div>
  )
};