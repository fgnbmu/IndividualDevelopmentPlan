import React from "react";
import { useNavigate } from 'react-router-dom';
import { $currentUser } from "../../../entities/users";

import { Paper } from "@mui/material";
import { useUnit } from "effector-react";

import styles from './main-page.module.css';
import { TasksStatusAnalysisPeriodPanel } from "../../../features/task-status-analysis-period-panel";
import { TasksByDateList } from "../../../features/tasks-by-date-list";
import { WELCOME_DESCRIPTION, WELCOME_TEXT } from "../lib/constants";
import { HolidayList } from "../../../features/holiday-list";

const WelcomePaper = {
  boxShadow: 'none',
  borderRadius: '15px',
  display: 'flex', 
  flexDirection: 'column'
}

export function MainPage(): React.ReactElement {
  const currentUser = useUnit($currentUser);
  const navigateTo = useNavigate();

  return (
    <div className={styles['main-page']}>
      <div className={styles['main-page__first-row']}>
        <Paper className={styles['main-page__welcome']} sx={WelcomePaper}>
          <div className={styles['main-page__welcome-text']}>
            {WELCOME_TEXT}
            <div className={styles['main-page__welcome-name']}>
              {currentUser?.name} 
            </div>
          </div>
          {WELCOME_DESCRIPTION}
          {/* <Button onClick={() => navigateTo("/tasks-list")}>
            Список задач
          </Button> */}
        </Paper>
        <TasksStatusAnalysisPeriodPanel/>
        <HolidayList />
      </div>
      <TasksByDateList/>
      {/* <Button onClick={() => navigateTo("/task")}>Создать таск</Button> */}
    </div>
  )
};