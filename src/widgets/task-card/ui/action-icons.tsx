import React from "react";
import styles from './task-card.module.css';
import { IconButton, Tooltip } from "@mui/material";
import { Edit, CheckCircle, ArrowCircleRight, DeleteOutline } from "@mui/icons-material";
import { useUnit } from "effector-react";
import { useNavigate } from "react-router-dom";
import { updateTaskStatusEvent } from "../../../entities/tasks";
import { TaskStatuses } from "../../../shared/types";
import { ActionIconsProps } from "../types";

export const ActionIcons = (props: ActionIconsProps): React.ReactElement => {
  const { taskData, onRemoveButtonClick } = props;

  const updateTaskStatus = useUnit(updateTaskStatusEvent);
  const navigateTo = useNavigate();

  return (
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
  )
};