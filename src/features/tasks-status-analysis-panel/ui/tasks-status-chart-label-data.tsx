import { styled } from "@mui/material";
import { TasksStatusChartLabelProps } from "../types";
  
export const TasksStatusChartLabelData = styled("text")<TasksStatusChartLabelProps>(({ theme, customStyles }) => ({
  fill: customStyles.fill || theme.palette.text.secondary,
  textAnchor: "middle",
  dominantBaseline: "auto",
  fontSize: customStyles.fontSize,
  fontWeight: 600,
  ...customStyles,
}));
