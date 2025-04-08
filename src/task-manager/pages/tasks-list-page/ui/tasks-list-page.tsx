import React from "react";
import { useUnit } from "effector-react";
import { useNavigate } from 'react-router-dom';

import { Button } from "@mui/material";
import { AddBoxRounded } from '@mui/icons-material';

import { $tasksList } from "../../../model/tasks-list";
import { TaskParams } from "../../../types/task-params";
import { StatusTasksCard } from "../../../features/status-tasks-card";
import { TaskStatuses } from "../../../types";

import styles from './tasks-list-page.module.css';

export function TasksListPage(): React.ReactElement {
  const tasksList = useUnit<TaskParams[]>($tasksList);
  const navigateTo = useNavigate();

  console.log(JSON.stringify(tasksList, null, 2));
  
  const scheduledTasksList = tasksList.filter(task => task.status === TaskStatuses.Scheduled);
  const activeTasksList = tasksList.filter(task => task.status === TaskStatuses.Active);
  const closedTasksList = tasksList.filter(task => task.status === TaskStatuses.Closed);

  return (
    <div className={styles['tasks-list']}>
      Список задач
      <Button
        startIcon={<AddBoxRounded/>}
        onClick={() => navigateTo("/new-task")}
        className={styles['tasks-list__add-task-button']}
      >
        Добавить задачу
      </Button>
      <div className={styles['tasks-list__status-tasks-cards']}>
        <StatusTasksCard 
          tasksList={scheduledTasksList} 
          statusTitle={TaskStatuses.Scheduled}>
        </StatusTasksCard>
        <StatusTasksCard
          tasksList={activeTasksList}
          statusTitle={TaskStatuses.Active}>
        </StatusTasksCard>
        <StatusTasksCard 
          tasksList={closedTasksList} 
          statusTitle={TaskStatuses.Closed}>
        </StatusTasksCard>
      </div>
    </div>
  );
};
