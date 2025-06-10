import React from "react";
import styles from './task-card.module.css';
import { TaskCardTitleProps } from "../types";
import { ActionIcons } from "./action-icons";

export const TaskCardTitle = (props: TaskCardTitleProps): React.ReactElement => {
  const { taskData, onRemoveButtonClick } = props;

  return (
    <div className={styles['task-card__title']}>
      {taskData.title}
      <ActionIcons taskData={taskData} onRemoveButtonClick={onRemoveButtonClick}/>
    </div>
  )
};