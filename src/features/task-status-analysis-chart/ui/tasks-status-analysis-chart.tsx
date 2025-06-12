import { Paper } from "@mui/material";
import * as React from 'react';
import { PieChart } from '@mui/x-charts/PieChart';
import { TASKS_STATUS_CHART_PARAMS } from "../lib/constants";
import { TasksStatusChartCenterLabel } from "./tasks-status-chart-center-label";
import { $tasks } from "../../../entities/tasks";
import { useUnit } from "effector-react";
import { TaskStatuses } from "../../../shared/types";
import { calculatePercentagesTasksByStatus, countTasksByStatus } from "../../../shared/lib/utils";
import { getColorForTaskStatus } from "../lib/utils";
import { TASK_STATUSES_OPTIONS } from "../../../shared/lib/constants";

export const TasksStatusAnalysisChart = (): React.ReactElement => {
  const tasks = useUnit($tasks);

  const totalTasks = tasks.length;
  const countsByStatus = countTasksByStatus(tasks);
  const percentages = calculatePercentagesTasksByStatus(totalTasks, countsByStatus);

  const chartData = Object.keys(countsByStatus).map((label: string) => ({
    label: TASK_STATUSES_OPTIONS[label as TaskStatuses],
    value: percentages[label as TaskStatuses],
    color: getColorForTaskStatus(label as TaskStatuses)
  }));

  return (
    <Paper sx={{width: 'fit-content', borderRadius: '15px', padding: '10px', boxShadow: 'none'}}>
      <PieChart
        series={[
          {
            data: chartData,
            innerRadius: 70,
            outerRadius: 90,
            startAngle: -90,
          },
        ]}
        {...TASKS_STATUS_CHART_PARAMS}
        sx={{height: 150, width: 150}}
      >
        <TasksStatusChartCenterLabel />
      </PieChart>
    </Paper>
  );
};