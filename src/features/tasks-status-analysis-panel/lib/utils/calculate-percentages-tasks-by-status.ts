import { TaskCountByStatus } from "../../types";

export const calculatePercentagesTasksByStatus = (total: number, statusCounts: TaskCountByStatus) => {
  return Object.fromEntries(Object.entries(statusCounts).map(([label, count]) => ([
    label,
    total > 0 ? Math.round((count / total) * 100) : 0
  ]))) as TaskCountByStatus;
};