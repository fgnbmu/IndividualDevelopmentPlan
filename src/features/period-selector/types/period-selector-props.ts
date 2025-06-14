import { TasksPeriods } from "../../../shared/types/tasks-periods";

export interface PeriodSelectorProps {
  selectedPeriod: TasksPeriods;
  onPeriodChange: (period: TasksPeriods) => void;
  selectorWidth?: number;
}