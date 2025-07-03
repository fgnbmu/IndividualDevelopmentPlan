import React from "react";
import styles from './task-card.module.css';
import { ActionIcons } from "./action-icons";
import { TaskCardTitleProps } from "../types";

export const TaskCardTitle = (props: TaskCardTitleProps): React.ReactElement => {
  const { taskData, onRemoveButtonClick } = props;

  return (
    <div className={styles['task-card__title']}>
      {taskData.title}
      <ActionIcons taskData={taskData} onRemoveButtonClick={onRemoveButtonClick}/>
    </div>
  )
};