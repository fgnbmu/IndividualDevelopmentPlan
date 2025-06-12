import React from "react";
import { useNavigate } from 'react-router-dom';
import { $currentUser } from "../../../entities/users";

import { Button, Paper } from "@mui/material";
import { useUnit } from "effector-react";

import styles from './main-page.module.css';
import { TasksStatusAnalysisPeriodPanel } from "../../../features/task-status-analysis-period-panel";
import { TasksByDateList } from "../../../features/tasks-by-date-list";

export function MainPage(): React.ReactElement {
  const currentUser = useUnit($currentUser);
  const navigateTo = useNavigate();

  return (
    <div className={styles['main-page']}>
      <div className={styles['main-page__first-row']}>
        <Paper className={styles['main-page__welcome']} sx={{boxShadow: 'none', borderRadius: '15px'}}>
          Добро пожаловать, 
          <div className={styles['main-page__welcome-name']}>
            {currentUser?.name} 
          </div>
          {/* <Button onClick={() => navigateTo("/tasks-list")}>
            Список задач
          </Button> */}
        </Paper>
        <TasksStatusAnalysisPeriodPanel/>
      </div>
      <TasksByDateList/>
      {/* <Button onClick={() => navigateTo("/task")}>Создать таск</Button> */}
    </div>
  )
};