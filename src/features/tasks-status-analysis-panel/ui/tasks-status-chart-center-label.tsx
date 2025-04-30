import { useDrawingArea } from "@mui/x-charts";
import { TasksStatusChartLabelData } from "./tasks-status-chart-label-data";
import { $tasks } from "../../../entities/tasks";
import { useUnit } from "effector-react";
import { TaskStatuses } from "../../../shared/types";
import { calculatePercentagesTasksByStatus, countTasksByStatus } from "../lib/utils";

export const TasksStatusChartCenterLabel = (): React.ReactElement => {
  const tasks = useUnit($tasks);

  const totalTasks = tasks.length;
  const countsByStatus = countTasksByStatus(tasks);
  const percentages = calculatePercentagesTasksByStatus(totalTasks, countsByStatus);

  const completedPercentage = percentages[TaskStatuses.Closed];

  const { width, height, left, top } = useDrawingArea();

  return (
    <>
      <TasksStatusChartLabelData
        x={left + width / 2}
        y={top + height / 2 - 5}
        children={`${completedPercentage}%`}
        customStyles={{ fontSize: 22 }}
      />
      <TasksStatusChartLabelData
        x={left + width / 2}
        y={top + height / 2 + 20}
        children="выполнено"
        customStyles={{ fontSize: 20 }}
      />
    </>
  );
};