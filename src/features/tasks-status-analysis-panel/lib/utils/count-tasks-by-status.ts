import { TaskStatuses } from "../../../../shared/types";
import { TaskParams } from "../../../../shared/types/task-params";
import { TaskCountByStatus } from "../../types";

export const countTasksByStatus = (tasks: TaskParams[]) => {
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