import { Paper, styled } from "@mui/material";
import * as React from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { PieChart } from '@mui/x-charts/PieChart';
import { getTasksStatusChartLabels } from "../lib/utils";
import { useDrawingArea } from "@mui/x-charts";

export const TasksStatusAnalysisPanel = (): React.ReactElement => {

  const colorPerItem = [
    { ...getTasksStatusChartLabels[0], color: 'none' },
    { ...getTasksStatusChartLabels[1], color: '#006838' },
  ];

  const pieParams = {
    height: 200,
    margin: { right: 5 },
    hideLegend: true,
  };

  const StyledText = styled('text')(({ theme }) => ({
    fill: theme.palette.text.primary,
    textAnchor: 'middle',
    dominantBaseline: 'central',
    fontSize: 16,
    fontWeight: 600
  }));
  
  const PieCenterLabel = ({ children }: { children: React.ReactNode }): React.ReactElement => {
    const { width, height, left, top } = useDrawingArea();
    return (
      <StyledText x={left + width / 2} y={top + height / 2}>
        {children}
      </StyledText>
    );
  };

  return (
    <Stack direction="row" width="100%" textAlign="center" spacing={2}>
      <Box flexGrow={1}>
        <PieChart
          series={[
            {
              data: colorPerItem,
              innerRadius: 80,
              outerRadius: 100,
              cornerRadius: 10,
              startAngle: -90,
            },
          ]}
          {...pieParams}
        >
             <PieCenterLabel>Выполнено: 70%</PieCenterLabel>
        </PieChart>
      </Box>
    </Stack>
  )
}