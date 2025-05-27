import { Paper, Select, MenuItem } from "@mui/material";
import * as React from 'react';
import LinearProgress from '@mui/material/LinearProgress';
import { getTasksDataByDate } from "../lib/utils";
import { TaskStatuses } from "../../../shared/types";
import { useState } from "react";
import { TasksPeriods } from "../types";
import styles from './task-status-analysis-period-panel.module.css';
import { TASK_STATUSES_OPTIONS } from "../../../shared/lib/constants";
import { TASKS_PERIODS_OPTIONS } from "../lib/constants";

const TaskStatusAnalysisPeriodPanelStyles = {
  borderRadius: '15px',
  padding: '25px',
  boxShadow: 'none',
  backgroundColor: '#006838',
  display: 'flex',
  height: 'fit-content',
  width: 510,
};

const SelectStyles = {
  width: 130,
  height: 24,
  borderRadius: 10,
  backgroundColor: '#FFFFFF',
  padding: '15px'
};

export const TasksStatusAnalysisPeriodPanel = (): React.ReactElement => {
  const [selectedPeriod, setSelectedPeriod] = useState(TasksPeriods.Today);

  const { countFilteredTasksByStatus, percentagesByStatus } = getTasksDataByDate(selectedPeriod);

  return (
    <Paper sx={TaskStatusAnalysisPeriodPanelStyles}>
      <div className={styles['task-status-analysis-period-panel__statuses']}>
        <div className={styles['task-status-analysis-period-panel__closed']}>
          <div className={styles['task-status-analysis-period-panel__closed-text']}>
            {TASK_STATUSES_OPTIONS.closed}
          </div>
          <div className={styles['task-status-analysis-period-panel__closed-percent']}>
            {percentagesByStatus[TaskStatuses.Closed]}%
          </div>
        </div>
        <div className={styles['task-status-analysis-period-panel__statuses-data']}>
          <div className={styles['task-status-analysis-period-panel__select-container']}>
            <Select
              value={selectedPeriod}
              onChange={(event) => setSelectedPeriod(event.target.value as TasksPeriods)}
              fullWidth
              sx={SelectStyles}
            >
              {Object.entries(TASKS_PERIODS_OPTIONS).map(([periodKey, periodName]) => (
                <MenuItem key={periodKey} value={periodKey}>
                  {periodName}
                </MenuItem>
              ))}
            </Select>
          </div>
          <div className={styles['task-status-analysis-period-panel__active']}>
            <div className={styles['task-status-analysis-period-panel__active-data']}>
              <div>{TASK_STATUSES_OPTIONS.active}</div>
              <div className={styles['task-status-analysis-period-panel__count']}>{countFilteredTasksByStatus[TaskStatuses.Active]}</div>
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
              <div>{TASK_STATUSES_OPTIONS.scheduled}</div>
              <div className={styles['task-status-analysis-period-panel__count']}>{countFilteredTasksByStatus[TaskStatuses.Scheduled]}</div>
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
      </div>
    </Paper>
  );
};