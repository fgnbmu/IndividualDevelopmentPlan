import { TaskStatuses } from "../../../../shared/types";

export const getColorForTaskStatus = (status: TaskStatuses) => {
  switch (status) {
    case TaskStatuses.Scheduled:
      return '#F7FAF9';
    case TaskStatuses.Active:
      return 'var(--main-light-color)';
    case TaskStatuses.Closed:
      return 'var(--main-color)';
    default:
      return 'var(--white-color)';
  }
};