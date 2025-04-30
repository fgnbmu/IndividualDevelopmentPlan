import { TaskStatuses } from "../../../../shared/types";

export const getColorForTaskStatus = (status: TaskStatuses) => {
  switch (status) {
    case TaskStatuses.Scheduled:
      return '#F7FAF9';
    case TaskStatuses.Active:
      return '#D9E8E1';
    case TaskStatuses.Closed:
      return '#006838';
    default:
      return '#FFFFFF';
  }
};