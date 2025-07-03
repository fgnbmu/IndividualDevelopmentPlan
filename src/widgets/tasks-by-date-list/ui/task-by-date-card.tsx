import dayjs from 'dayjs';
import React, { useState } from "react";
import styles from './task-by-date-card.module.css';
import { TaskStatuses } from "../../../shared/types";
import { TASK_STATUSES_OPTIONS } from "../../../shared/lib/constants";
import { MoreVert } from "@mui/icons-material";
import { IconButton, Menu, MenuItem } from "@mui/material";
import { STATUS_CLASS_MAP, TASK_MENU_ACTION_OPTIONS } from "../lib/constants";
import { useNavigate } from "react-router-dom";
import { removeTaskEvent } from "../../../entities/tasks";
import { RemoveTaskModal } from "../../../features/remove-task-modal";
import { USERS_MOCK_DATA } from "../../../entities/users";
import { TaskByDateCardProps } from '../types';
import { TaskModal } from './task-modal';

export const TaskByDateCard = (props: TaskByDateCardProps): React.ReactElement => {
  const { taskData } = props;
  const statusClass = STATUS_CLASS_MAP[taskData.status as TaskStatuses];
  const navigateTo = useNavigate();
  const [isRemoveTaskModalVisible, setIsRemoveTaskModalVisible] = useState<boolean>(false);
  const [isTaskModalVisible, setIsTaskModalVisible] = useState<boolean>(false);

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleOpenMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleRemoveTask = (): void => {
    removeTaskEvent(taskData.id);
    setIsRemoveTaskModalVisible(false);
  };

  const handleTaskAction = (actionType: string) => {
    switch(actionType) {
      case "edit":
        navigateTo(`/task/${taskData.id}`);
        break;
      case "delete":
        setIsRemoveTaskModalVisible(true);
        break;
      case "more":
        setIsTaskModalVisible(true);
        break;
      default:
        () => {};
    }
  };

  const currentDate = new Date().toISOString().split('T')[0];

  const isOverdueTask = taskData.status !== TaskStatuses.Closed && taskData.date < currentDate;

  return (
    <div className={styles["task-by-date-card"]}>
      <div className={styles["task-by-date-card__title"]}>
        <div className={styles["task-by-date-card__title-text"]}>{taskData.title}</div>
        <div className={styles["task-by-date-card__title-icon"]}>
          <IconButton aria-controls="simple-menu" aria-expanded={Boolean(anchorEl)} aria-haspopup="true" onClick={handleOpenMenu}>
            <MoreVert />
          </IconButton>
        </div>
      </div>
      <div className={styles['task-by-date-card__statuses']}>
        <div className={`${styles["task-by-date-card__status"]} ${statusClass}`}>
          {TASK_STATUSES_OPTIONS[taskData.status as TaskStatuses]}
        </div>
        {isOverdueTask && <div className={styles['task-by-date-card__status-overdue']}>Просрочено</div>}
      </div>
      <div>
        <div className={styles["task-by-date-card__assignee-title"]}>Ответственный(-ые):</div>
        {taskData.assignee
          ?.map((assigneeId) => {
            const user = USERS_MOCK_DATA.find(user => user.id === assigneeId);
            return user?.name ?? '';
          })
          .join(', ')
          || 'Не указан'
        }
      </div>
      <div className={styles["task-by-date-card__date"]}>
        {dayjs(taskData.date).format('DD.MM.YYYY')}
      </div>

      <Menu
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleCloseMenu}
      >
        {TASK_MENU_ACTION_OPTIONS.map(option => (
          <MenuItem
            key={option.label}
            onClick={() => {
              handleTaskAction(option.actionType);
              handleCloseMenu();
            }}
          >
            {option.label}
          </MenuItem>
        ))}
      </Menu>
      <RemoveTaskModal
        isVisible={isRemoveTaskModalVisible}
        taskTitle={taskData.title}
        onClose={(): void => setIsRemoveTaskModalVisible(false)}
        onConfirm={handleRemoveTask}
      />
      <TaskModal
        isVisible={isTaskModalVisible}
        taskData={taskData}
        onClose={(): void => setIsTaskModalVisible(false)}
      />
    </div>
  );
};