import React from "react";
import { TaskSettings } from "../../../features/task-settings";
import styles from './adding-task-page.module.css';

export function AddingTaskPage(): React.ReactElement {
  return (
    <div className={styles['adding-task-page']}>
      <div>Создание задачи</div>
      <TaskSettings/>
    </div>
  );
};
