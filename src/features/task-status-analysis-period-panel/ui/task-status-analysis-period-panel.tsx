import { Paper } from "@mui/material";
import * as React from 'react';
import { $tasks } from "../../../entities/tasks";
import { useUnit } from "effector-react";
import { calculatePercentagesTasksByStatus, countTasksByStatus } from "../../../shared/lib/utils";
import LinearProgress from '@mui/material/LinearProgress';
import { TaskStatuses } from "../../../shared/types";

import styles from './task-status-analysis-period-panel.module.css';

export const TasksStatusAnalysisPeriodPanel = (): React.ReactElement => {
  const tasks = useUnit($tasks);
  const today = new Date().toISOString().split('T')[0];
  const todayTasks = tasks.filter(task => task.date === today);
  const countTodayTasksByStatus = countTasksByStatus(todayTasks);

  const percentagesByStatus = calculatePercentagesTasksByStatus(todayTasks.length, countTodayTasksByStatus);

  const TaskStatusAnalysisPeriodPanelStyles = {
    borderRadius: '15px',
    padding: '25px',
    boxShadow: 'none',
    backgroundColor: '#006838',
    display: 'flex',
    height: 'fit-content'
  };

  return (
    <Paper sx={TaskStatusAnalysisPeriodPanelStyles}>
      <div className={styles['task-status-analysis-period-panel__closed']}>
        <div className={styles['task-status-analysis-period-panel__closed-text']}>{TaskStatuses.Closed}</div>
        <div className={styles['task-status-analysis-period-panel__closed-percent']}>
          {percentagesByStatus[TaskStatuses.Closed]}%
        </div>
      </div>
      <div className={styles['task-status-analysis-period-panel__statuses-data']}>
        <div className={styles['task-status-analysis-period-panel__active']}>
          <div className={styles['task-status-analysis-period-panel__active-data']}>
            <div>{TaskStatuses.Active}</div>
            <div className={styles['task-status-analysis-period-panel__count']}>{countTodayTasksByStatus[TaskStatuses.Active]}</div>
          </div>
          <div className={styles['task-status-analysis-period-panel__bar-data']}>
            <LinearProgress 
              variant="determinate"
              value={percentagesByStatus[TaskStatuses.Active]}
              sx={{
                '.MuiLinearProgress-bar': {
                  backgroundColor: '#A4F1A7',
                },
              }}
            />
            <div className={styles['task-status-analysis-period-panel__active-percent']}>
              {percentagesByStatus[TaskStatuses.Active]}%
            </div>
          </div>
        </div>
        <div className={styles['task-status-analysis-period-panel__scheduled']}>
          <div className={styles['task-status-analysis-period-panel__scheduled-data']}>
            <div>{TaskStatuses.Scheduled}</div>
            <div className={styles['task-status-analysis-period-panel__count']}>{countTodayTasksByStatus[TaskStatuses.Scheduled]}</div>
          </div>
          <div className={styles['task-status-analysis-period-panel__bar-data']}>
            <LinearProgress 
              variant="determinate"
              value={percentagesByStatus[TaskStatuses.Scheduled]}
              sx={{
                '.MuiLinearProgress-bar': {
                  backgroundColor: '#AFE2FF',
                },
              }}
            />
            <div className={styles['task-status-analysis-period-panel__scheduled-percent']}>
              {percentagesByStatus[TaskStatuses.Scheduled]}%
            </div>
          </div>
        </div>
      </div>
    </Paper>
  );
};