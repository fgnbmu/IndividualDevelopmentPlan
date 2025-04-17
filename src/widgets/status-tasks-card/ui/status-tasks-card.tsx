import React from "react";

import { Card, CardContent, CardHeader } from "@mui/material";
import styles from './status-tasks-card.module.css';

import { StatusTasksCardProps } from '../types';
import { TaskCard } from '../../task-card';
import { StatusTasksCardTitle } from "./status-tasks-card-title";

export const StatusTasksCard = (props: StatusTasksCardProps): React.ReactElement => {
  const { tasksList, statusTitle } = props;

  const TasksCardStyles = {
    width: 250,
    padding: '10px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  };

  const TasksCardHeaderStyles = {
    padding: '10px',
    width: '240px'
  };

  return (
    <div>
      <Card
        sx={TasksCardStyles}
        className={styles['status-tasks-card']}
      >
        <CardHeader
          sx={TasksCardHeaderStyles}
          title={<StatusTasksCardTitle statusTitle={statusTitle} />}
        />
        <CardContent>
          {tasksList.length === 0 ? (
            <span>Задачи в списке отсутствуют.</span> // текст должен отличаться
          ) : (
            <div className={styles['status-tasks-card__content']}>
              {tasksList.map((task) => (
                <TaskCard key={task.id} taskData={task}/>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};