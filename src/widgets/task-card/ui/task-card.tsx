import React from "react";

import { Card, CardContent, CardHeader, IconButton } from "@mui/material";
import styles from './task-card.module.css';
import { TaskCardProps } from "../types";
import { TaskStatuses } from "../../../shared/types";
import { ArrowCircleRight, CheckCircle, Edit } from "@mui/icons-material";
import { updateTaskStatusEvent } from '../../../entities/tasks/model/tasks';

export function TaskCard(props: TaskCardProps): React.ReactElement {
  const { taskData } = props;

  const CardHeaderStyles = {
    padding: '2px 2px 5px 2px',
  };

  const CardContentStyles = {
    padding: '2px',
  };

  const taskTitle: React.ReactElement = (
    <div className={styles['task-card__title']}>
      {taskData.title}
      <div className={styles['task-card__icons']}>
        {(taskData.status === TaskStatuses.Active || taskData.status === TaskStatuses.Scheduled) && (
          <IconButton title="Редактировать">
            <Edit />
          </IconButton>
        )}
        {(taskData.status === TaskStatuses.Active) && (
          <IconButton title="Завершить" onClick={() => updateTaskStatusEvent({id: taskData.id, newStatus: TaskStatuses.Closed})}>
            <CheckCircle color="primary" />
          </IconButton>
        )}
        {(taskData.status === TaskStatuses.Scheduled) && (
          <IconButton title="Начать" onClick={() => updateTaskStatusEvent({id: taskData.id, newStatus: TaskStatuses.Active})}>
            <ArrowCircleRight color="primary" />
          </IconButton>
        )}
      </div>
    </div>
  );

  const getBackgroundColor = (status: string) => {
    switch (status) {
      case TaskStatuses.Closed:
        return '#FFE2E2';
      case TaskStatuses.Active:
        return '#CAFFCD';
      case TaskStatuses.Scheduled:
        return '#D7F1FF';
      default:
        return '#FFFFFF';
    }
  };

  const TaskStyles = {
    backgroundColor: getBackgroundColor(taskData.status),
    padding: '8px 10px 0px 10px',
    width: '220px',
  }

  const taskFields = [
    { name: "Дата", value: taskData.date },
    { name: "Описание", value: taskData.description },
    { name: "Категория", value: taskData.category }
  ];

  return (
    <div>
      <Card
        sx={TaskStyles}
      >
        <CardHeader
          sx={CardHeaderStyles}
          title={taskTitle}
        />
        <CardContent
          sx={CardContentStyles}
        >
          <div className={styles['task-card__content']}>
            {taskFields.map((field, index) => (
              <div className={styles['task-card__field']} key={index}>
                <div className={styles['task-card__field-name']}>{field.name}:</div>
                <div className={styles['task-card__field-value']}>{field.value}</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};