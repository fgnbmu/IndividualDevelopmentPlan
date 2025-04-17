import { TaskStatuses } from "../../../../shared/types";

export const getTaskCardBackgroundColor = (status: string): string => {
  switch (status) {
    case TaskStatuses.Closed:
      return '#FFE2E2';
    case TaskStatuses.Active:
      return '#CAFFCD';
    case TaskStatuses.Scheduled:
      return '#D7F1FF';
    default:
      return '#FFFFFF';
    }
};