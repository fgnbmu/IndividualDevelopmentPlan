import React from "react";
import { useUnit } from "effector-react";

import { $tasks } from "../../../entities/tasks";
import { TaskParams } from "../../../shared/types/task-params";
import { StatusTasksCard } from "../../../widgets/status-tasks-card";
import { TaskStatuses } from "../../../shared/types";

import styles from './tasks-list-page.module.css';

export const TasksListPage = (): React.ReactElement => {
  const tasksList = useUnit<TaskParams[]>($tasks);

  console.log(JSON.stringify(tasksList, null, 2));
  
  const taskLists = {
    [TaskStatuses.Scheduled]: tasksList.filter(task => task.status === TaskStatuses.Scheduled),
    [TaskStatuses.Active]: tasksList.filter(task => task.status === TaskStatuses.Active),
    [TaskStatuses.Closed]: tasksList.filter(task => task.status === TaskStatuses.Closed),
  };

  return (
    <div className={styles['tasks-list']}>
      Список задач
      <div className={styles['tasks-list__status-tasks-cards']}>
        {Object.entries(taskLists).map(([status, tasks]) => (
          <StatusTasksCard 
            key={status} 
            tasksList={tasks} 
            statusTitle={status}
          />
        ))}
      </div>
    </div>
  );
};
