import { useUnit } from "effector-react";
import { $tasks } from "../../../../entities/tasks";
import { getCurrentMonthRange } from "./get-current-month-range";
import { countTasksByStatus, calculatePercentagesTasksByStatus } from "../../../../shared/lib/utils";
import { getCurrentWeekRange } from "./get-current-week-range";
import { TaskParams } from "../../../../shared/types/task-params";
import { TasksPeriods } from "../../types";

export const getTasksDataByDate = (period: string) => {
  const tasks = useUnit($tasks);

  const today = new Date().toISOString().split('T')[0];
  const [monthStart, monthEnd] = getCurrentMonthRange();
  const [weekStart, weekEnd] = getCurrentWeekRange();

  let filteredTasks: TaskParams[] = [];
  switch (period) {
    case TasksPeriods.Today:
      filteredTasks = tasks.filter(task => task.date === today);
      break;
    case TasksPeriods.Week:
      filteredTasks = tasks.filter(task => task.date >= weekStart && task.date <= weekEnd);
      break;
    case TasksPeriods.Month:
      filteredTasks = tasks.filter(task => task.date >= monthStart && task.date <= monthEnd);
      break;
    default:
      filteredTasks = [];
  }

  const countFilteredTasksByStatus = countTasksByStatus(filteredTasks);
  const percentagesByStatus = calculatePercentagesTasksByStatus(filteredTasks.length, countFilteredTasksByStatus);

  return {
    countFilteredTasksByStatus,
    percentagesByStatus
  };
}