import { Paper } from "@mui/material";
import * as React from 'react';
import { $tasks } from "../../../entities/tasks";
import { useUnit } from "effector-react";
import { calculatePercentagesTasksByStatus, countTasksByStatus } from "../../../shared/lib/utils";
import LinearProgress from '@mui/material/LinearProgress';

export const TasksStatusAnalysisPeriodPanel = (): React.ReactElement => {
  const tasks = useUnit($tasks);
  const today = new Date().toISOString().split('T')[0];

  const todayTasks = tasks.filter(task => task.date === today);

  const totalTasks = todayTasks.length;
  const countsByStatus = countTasksByStatus(todayTasks);

  return (
    <Paper sx={{width: 'fit-content', borderRadius: '15px', padding: '10px', boxShadow: 'none'}}>
      kkkkdc
      <LinearProgress variant="determinate" value={60} />
    </Paper>
  );
};