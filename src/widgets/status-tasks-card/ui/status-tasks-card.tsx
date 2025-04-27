import React from "react";

import { Card, CardContent, CardHeader } from "@mui/material";
import styles from './status-tasks-card.module.css';

import { StatusTasksCardProps } from '../types';
import { TaskCard } from '../../task-card';
import { StatusTasksCardTitle } from "./status-tasks-card-title";

export const StatusTasksCard = (props: StatusTasksCardProps): React.ReactElement => {
  const { tasksList, statusTitle } = props;

  const StatusTasksCardStyles = {
    width: 300,
    padding: '20px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: '#EFF2F7'
  };

  const TasksCardHeaderStyles = {
    padding: '10px 0px',
    width: '100%',
  };

  return (
    <div>
      <Card
        sx={StatusTasksCardStyles}
        className={styles['status-tasks-card']}
      >
        <CardHeader
          sx={TasksCardHeaderStyles}
          title={<StatusTasksCardTitle statusTitle={statusTitle} />}
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