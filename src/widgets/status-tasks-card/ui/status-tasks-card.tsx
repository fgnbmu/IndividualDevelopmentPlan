import React from "react";

import { Card, CardContent, CardHeader } from "@mui/material";
import styles from './status-tasks-card.module.css';

import { StatusTasksCardProps } from '../types'

export function StatusTasksCard(props: StatusTasksCardProps): React.ReactElement {
  const { tasksList, statusTitle } = props;

  return (
    <div>
      <Card className={styles['status-tasks-card']}>
        <CardHeader
          title={statusTitle}
        />
        <CardContent>
          {tasksList.length === 0 ? (
            <p>Нет запланированных задач.</p>
          ) : (
            <ul>
              {tasksList.map((task) => (
                <li key={task.id}>
                  {task.id}: {task.title} - {task.date} - {task.description} - {task.category}
                </li>
              ))}
            </ul>
          )}
        </CardContent>
      </Card>
    </div>
  );
};