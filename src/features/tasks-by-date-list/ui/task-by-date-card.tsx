import React, { useState } from "react";
import styles from './tasks-by-date-list.module.css';
import { TaskByDateCardProps, TaskMenuActionOption } from "../types";
import { TaskStatuses } from "../../../shared/types";
import { TASK_STATUSES_OPTIONS } from "../../../shared/lib/constants";
import { MoreVert } from "@mui/icons-material";
import { IconButton, Menu, MenuItem } from "@mui/material";
import { STATUS_CLASS_MAP } from "../lib/constants";
import { useNavigate } from "react-router-dom";
import { removeTaskEvent } from "../../../entities/tasks";
import { RemoveTaskModal } from "../../remove-task-modal";

const ACTION_OPTIONS: TaskMenuActionOption[] = [
  { label: "Редактировать задачу", actionType: "edit" },
  { label: "Удалить задачу", actionType: "delete" },
];

export function TaskByDateCard(props: TaskByDateCardProps): React.ReactElement {
  const { taskData } = props;
  const statusClass = STATUS_CLASS_MAP[taskData.status as TaskStatuses];
  const navigateTo = useNavigate();
  const [isRemoveTaskModalVisible, setIsRemoveTaskModalVisible] = useState<boolean>(false);

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
        navigateTo(`/task/${taskData.id}`)
        break;
      case "delete":
        setIsRemoveTaskModalVisible(true)
        break;
      default:
        () => {};
    }
  };

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
      <div className={`${styles["task-by-date-card__status"]} ${statusClass}`}>
        {TASK_STATUSES_OPTIONS[taskData.status as TaskStatuses]}
      </div>
      <div className={styles["task-by-date-card__date"]}>{taskData.date}</div>
      
      <Menu
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleCloseMenu}
      >
        {ACTION_OPTIONS.map(option => (
          <MenuItem
            key={option.label}
            onClick={() => {
              handleTaskAction(option.actionType); // Передача данных задачи
              handleCloseMenu(); // Закрываем меню сразу после выбора действия
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
    </div>
  );
}