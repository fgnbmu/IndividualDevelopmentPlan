import { Select, MenuItem } from "@mui/material";
import * as React from 'react';
import { TASKS_PERIODS_OPTIONS } from "../../../shared/lib/constants";
import { TasksPeriods } from "../../../shared/types/tasks-periods";

const SelectStyles = {
  width: 130,
  height: 24,
  borderRadius: 10,
  backgroundColor: '#FFFFFF',
  padding: '15px'
};

interface PeriodSelectorProps {
  selectedPeriod: TasksPeriods;
  onPeriodChange: (period: TasksPeriods) => void;
}

export const PeriodSelector = ({ selectedPeriod, onPeriodChange }: PeriodSelectorProps): React.ReactElement => {
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