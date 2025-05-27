import React from "react";
import { useUnit } from "effector-react";

import { $tasks } from "../../../entities/tasks";
import { TaskParams } from "../../../shared/types/task-params";
import { StatusTasksCard } from "../../../widgets/status-tasks-card";
import { TaskStatuses } from "../../../shared/types";

import styles from './tasks-list-page.module.css';
import { TasksStatusAnalysisChart } from "../../../features/task-status-analysis-chart";
import { TASK_STATUSES_OPTIONS } from "../../../shared/lib/constants";

export const TasksListPage = (): React.ReactElement => {
  const tasksList = useUnit<TaskParams[]>($tasks);
  
  const taskLists = {
    [TaskStatuses.Scheduled]: tasksList.filter(task => task.status === TaskStatuses.Scheduled),
    [TaskStatuses.Active]: tasksList.filter(task => task.status === TaskStatuses.Active),
    [TaskStatuses.Closed]: tasksList.filter(task => task.status === TaskStatuses.Closed),
  };

  return (
    <div className={styles['tasks-list']}>
      <TasksStatusAnalysisChart/>
      <div className={styles['tasks-list__status-tasks-cards']}>
        {Object.entries(taskLists).map(([status, tasks]) => (
          <StatusTasksCard 
            key={status} 
            tasksList={tasks} 
            status={TASK_STATUSES_OPTIONS[status as TaskStatuses]}
          />
        ))}
      </div>
    </div>
  );
};
