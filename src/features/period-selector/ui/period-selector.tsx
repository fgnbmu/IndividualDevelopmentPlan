import { Select, MenuItem } from "@mui/material";
import { TASKS_PERIODS_OPTIONS } from "../../../shared/lib/constants";
import { TasksPeriods } from "../../../shared/types/tasks-periods";
import { PeriodSelectorProps } from "../types";

export const PeriodSelector = (props: PeriodSelectorProps): React.ReactElement => {
  const { selectedPeriod, onPeriodChange, selectorWidth } = props;

  const SelectStyles = {
    width: selectorWidth || 130,
    height: 24,
    borderRadius: 10,
    backgroundColor: 'var(--white-color)',
    padding: '15px'
  };

  return (
    <Select
      value={selectedPeriod}
      onChange={(event) => onPeriodChange(event.target.value as TasksPeriods)}
      fullWidth
      sx={SelectStyles}
    >
      {Object.entries(TASKS_PERIODS_OPTIONS).map(([periodKey, periodName]) => (
        <MenuItem key={periodKey} value={periodKey}>
          {periodName}
        </MenuItem>
      ))}
    </Select>
  );
};