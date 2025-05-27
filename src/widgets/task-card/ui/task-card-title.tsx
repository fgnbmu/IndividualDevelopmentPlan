import React from "react";
import styles from './task-card.module.css';
import { TaskStatuses } from "../../../shared/types";
import { IconButton, Tooltip } from "@mui/material";
import { Edit, CheckCircle, ArrowCircleRight, DeleteOutline } from "@mui/icons-material";
import { useNavigate } from 'react-router-dom';
import { useUnit } from "effector-react";
import { updateTaskStatusEvent } from "../../../entities/tasks";
import { TaskCardTitleProps } from "../types";

export const TaskCardTitle = (props: TaskCardTitleProps): React.ReactElement => {
  const { taskData, onRemoveButtonClick } = props;

  const updateTaskStatus = useUnit(updateTaskStatusEvent);
  const navigateTo = useNavigate();

  return (
    <div className={styles['task-card__title']}>
      {taskData.title}
      <div className={styles['task-card__icons']}>
        {(taskData.status === TaskStatuses.Active || taskData.status === TaskStatuses.Scheduled) && (
          <Tooltip title="Редактировать" >
            <IconButton 
              onClick={() => navigateTo(`/task/${taskData.id}`)}
            >
              <Edit />
            </IconButton>
          </Tooltip>
        )}
        {(taskData.status === TaskStatuses.Active) && (
          <Tooltip title="Завершить" >
            <IconButton 
              onClick={() => updateTaskStatus({id: taskData.id, newStatus: TaskStatuses.Closed})}
            >
              <CheckCircle color="primary" />
            </IconButton>
          </Tooltip>
        )}
        {(taskData.status === TaskStatuses.Scheduled) && (
          <Tooltip title="Начать">
            <IconButton
              onClick={() => updateTaskStatus({id: taskData.id, newStatus: TaskStatuses.Active})}
            >
              <ArrowCircleRight color="primary" />
            </IconButton>
          </Tooltip>
        )}
        <Tooltip title="Удалить">
          <IconButton
            onClick={onRemoveButtonClick}
          >
            <DeleteOutline />
          </IconButton>
        </Tooltip>
      </div>
    </div>
  )
};