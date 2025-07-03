import { TaskStatuses } from "../../../shared/types";

export const getTaskCardBackgroundColor = (status: string): string => {
  switch (status) {
    case TaskStatuses.Closed:
      return '#FFEEEE';
    case TaskStatuses.Active:
      return '#E9FFEA';
    case TaskStatuses.Scheduled:
      return '#ECF8FF';
    default:
      return 'var(--white-color)';
    }
};