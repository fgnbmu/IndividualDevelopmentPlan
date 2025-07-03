import React from "react";
import { $currentUser } from "../../../entities/users";

import { Paper } from "@mui/material";
import { useUnit } from "effector-react";

import styles from './main-page.module.css';
import { WELCOME_DESCRIPTION, WELCOME_TEXT } from "../lib/constants";
import { HolidayList } from "../../../widgets/holiday-list";
import { OverdueTasksList } from "../../../widgets/overdue-tasks-list";
import { TasksStatusAnalysisChart } from "../../../widgets/task-status-analysis-chart";
import { TasksByDateList } from "../../../widgets/tasks-by-date-list";

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