import React from "react";

import { Card, CardContent, CardHeader, IconButton } from "@mui/material";
import styles from './status-tasks-card.module.css';

import { StatusTasksCardProps } from '../types';
import { TaskCard } from '../../task-card';
import { useNavigate } from "react-router-dom";
import { AddBoxRounded } from "@mui/icons-material";
import { TaskStatuses } from "../../../shared/types";

export function StatusTasksCard(props: StatusTasksCardProps): React.ReactElement {
  const { tasksList, statusTitle } = props;
  const navigateTo = useNavigate();

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
  }

  const taskStatusTitle: React.ReactElement = (
    <div className={styles['status-tasks-card__title']}>
      {statusTitle}
      {statusTitle === TaskStatuses.Scheduled && (
        <IconButton color="primary" onClick={() => navigateTo("/task")}>
          <AddBoxRounded />
        </IconButton>
      )}
    </div>
  )

  return (
    <div>
      <Card
        sx={TasksCardStyles}
        className={styles['status-tasks-card']}
      >
        <CardHeader
          sx={TasksCardHeaderStyles}
          title={taskStatusTitle}
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