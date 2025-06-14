import { useUnit } from "effector-react";
import { $tasks } from "../../../entities/tasks";
import { getCurrentMonthRange } from "./get-current-month-range";
import { countTasksByStatus } from "./count-tasks-by-status";
import { getCurrentWeekRange } from "./get-current-week-range";
import { TaskParams } from "../../types/task-params";
import { TasksPeriods } from "../../types/tasks-periods";
import { calculatePercentagesTasksByStatus } from "./calculate-percentages-tasks-by-status";

export const getTasksDataByDate = (period: string) => {
  const tasks = useUnit($tasks);

  const today = new Date().toISOString().split('T')[0];
  const [monthStart, monthEnd] = getCurrentMonthRange();
  const [weekStart, weekEnd] = getCurrentWeekRange();

  let filteredByDateTasks: TaskParams[] = [];
  switch (period) {
    case TasksPeriods.Today:
      filteredByDateTasks = tasks.filter(task => task.date === today);
      break;
    case TasksPeriods.Week:
      filteredByDateTasks = tasks.filter(task => task.date >= weekStart && task.date <= weekEnd);
      break;
    case TasksPeriods.Month:
      filteredByDateTasks = tasks.filter(task => task.date >= monthStart && task.date <= monthEnd);
      break;
    default:
      filteredByDateTasks = [];
  }

  const countFilteredTasksByStatus = countTasksByStatus(filteredByDateTasks);
  const percentagesByStatus = calculatePercentagesTasksByStatus(filteredByDateTasks.length, countFilteredTasksByStatus);

  return {
    filteredByDateTasks,
    countFilteredTasksByStatus,
    percentagesByStatus
  };
}