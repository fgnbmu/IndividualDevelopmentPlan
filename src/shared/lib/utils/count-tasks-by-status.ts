import { TaskStatuses } from "../../types";
import { TaskParams } from "../../types/task-params";
import { TaskCountByStatus } from '../../types/tasks-count-by-status';

export const countTasksByStatus = (tasks: TaskParams[]): TaskCountByStatus => {
  const result: TaskCountByStatus = {
    [TaskStatuses.Scheduled]: 0,
    [TaskStatuses.Active]: 0,
    [TaskStatuses.Closed]: 0,
  };

  for (let task of tasks) {
    switch (task.status) {
      case TaskStatuses.Scheduled:
        result[TaskStatuses.Scheduled]++;
        break;
      case TaskStatuses.Active:
        result[TaskStatuses.Active]++;
        break;
      case TaskStatuses.Closed:
        result[TaskStatuses.Closed]++;
        break;
    }
  }

  return result;
};