import { Paper } from "@mui/material";
import LinearProgress from '@mui/material/LinearProgress';
import { TaskStatuses } from "../../../shared/types";
import { useState } from "react";
import styles from './task-status-analysis-period-panel.module.css';
import { TASK_STATUSES_OPTIONS } from "../../../shared/lib/constants";
import { TasksPeriods } from "../../../shared/types/tasks-periods";
import { PeriodSelector } from "../../../entities/period-selector";
import { getTasksDataByDate } from "../../../shared/lib/utils";
import { $tasks } from "../../../entities/tasks";
import { useUnit } from "effector-react";

const TaskStatusAnalysisPeriodPanelStyles = {
  borderRadius: '15px',
  padding: '25px',
  boxShadow: 'none',
  backgroundColor: 'var(--main-color)',
  display: 'flex',
  height: 'fit-content',
  width: 510,
};

export const TasksStatusAnalysisPeriodPanel = (): React.ReactElement => {
  const [selectedPeriod, setSelectedPeriod] = useState(TasksPeriods.All);
  const tasks = useUnit($tasks);

  const { countFilteredTasksByStatus, percentagesByStatus } = getTasksDataByDate(selectedPeriod, tasks);

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
          <PeriodSelector 
            selectedPeriod={selectedPeriod} 
            onPeriodChange={setSelectedPeriod} 
          />
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