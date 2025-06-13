import React from "react";

import { Card, CardContent, CardHeader } from "@mui/material";
import styles from './status-tasks-card.module.css';

import { StatusTasksCardProps } from '../types';
import { TaskCard } from '../../task-card';
import { StatusTasksCardTitle } from "./status-tasks-card-title";

const StatusTasksCardStyles = {
  width: '100%',
  padding: '20px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
};

const TasksCardHeaderStyles = {
  padding: '10px 0px',
  width: '100%',
};

export const StatusTasksCard = (props: StatusTasksCardProps): React.ReactElement => {
  const { tasksList, status } = props;

  return (
    <div>
      <Card
        sx={StatusTasksCardStyles}
        className={styles['status-tasks-card']}
      >
        <CardHeader
          sx={TasksCardHeaderStyles}
          title={<StatusTasksCardTitle status={status} />}
        />
        <CardContent>
          {tasksList.length === 0 ? (
            <span>Задачи в списке отсутствуют.</span>
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