import React from "react";
import styles from './task-card.module.css';
import { TaskStatuses } from "../../../shared/types";
import { IconButton } from "@mui/material";
import { Edit, CheckCircle, ArrowCircleRight, DeleteOutline } from "@mui/icons-material";
import { useNavigate } from 'react-router-dom';
import { useUnit } from "effector-react";
import { updateTaskStatusEvent } from "../../../entities/tasks";
import { TaskCardTitleProps } from "../types";

export const TaskCardTitle = (props: TaskCardTitleProps): React.ReactElement => {
  const { taskData, onDeleteButtonClick } = props;

  const updateTaskStatus = useUnit(updateTaskStatusEvent);
  const navigateTo = useNavigate();

  return (
    <div className={styles['task-card__title']}>
    {taskData.title}
    <div className={styles['task-card__icons']}>
      {(taskData.status === TaskStatuses.Active || taskData.status === TaskStatuses.Scheduled) && (
        <IconButton 
          title="Редактировать" 
          onClick={() => navigateTo(`/task/${taskData.id}`)}
        >
          <Edit />
        </IconButton>
      )}
      {(taskData.status === TaskStatuses.Active) && (
        <IconButton 
          title="Завершить" 
          onClick={() => updateTaskStatus({id: taskData.id, newStatus: TaskStatuses.Closed})}
        >
          <CheckCircle color="primary" />
        </IconButton>
      )}
      {(taskData.status === TaskStatuses.Scheduled) && (
        <IconButton 
          title="Начать" 
          onClick={() => updateTaskStatus({id: taskData.id, newStatus: TaskStatuses.Active})}
        >
          <ArrowCircleRight color="primary" />
        </IconButton>
      )}
      <IconButton
        title="Удалить"
        onClick={onDeleteButtonClick}
      >
        <DeleteOutline />
      </IconButton>
    </div>
  </div>
  )
};