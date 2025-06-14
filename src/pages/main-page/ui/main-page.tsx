import React from "react";
import { $currentUser } from "../../../entities/users";

import { Paper } from "@mui/material";
import { useUnit } from "effector-react";

import styles from './main-page.module.css';
import { TasksByDateList } from "../../../features/tasks-by-date-list";
import { WELCOME_DESCRIPTION, WELCOME_TEXT } from "../lib/constants";
import { HolidayList } from "../../../features/holiday-list";
import { OverdueTasksList } from "../../../features/overdue-tasks-list";
import { TasksStatusAnalysisChart } from "../../../features/task-status-analysis-chart";

const WelcomePaper = {
  boxShadow: 'none',
  borderRadius: '15px',
  display: 'flex', 
  flexDirection: 'column'
}

export const MainPage = (): React.ReactElement => {
  const currentUser = useUnit($currentUser);

  return (
    <div className={styles['main-page']}>
      <div className={styles['main-page__row']}>
        <Paper className={styles['main-page__welcome']} sx={WelcomePaper}>
          <div className={styles['main-page__welcome-text']}>
            {WELCOME_TEXT}
            <div className={styles['main-page__welcome-name']}>
              {currentUser?.name} 
            </div>
          </div>
          {WELCOME_DESCRIPTION}
        </Paper>
        <TasksStatusAnalysisChart/>
        <HolidayList />
      </div>
      <div className={styles['main-page__row']}>
        <TasksByDateList/>
        <OverdueTasksList/>
      </div>
    </div>
  )
};