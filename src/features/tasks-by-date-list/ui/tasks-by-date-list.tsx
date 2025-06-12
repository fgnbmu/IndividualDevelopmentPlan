import { Paper } from "@mui/material";
import React from "react";
import styles from './tasks-by-date-list.module.css';
import { $tasks } from '../../../entities/tasks';
import { useUnit } from "effector-react";
import { TaskByDateCard } from "./task-by-date-card";
import { Filter, Filter1, Filter1Sharp, FilterAlt, FilterBAndW, FilterCenterFocus, FilterDrama, FilterFrames, FilterHdr, FilterList, FilterNone, FilterTiltShift } from "@mui/icons-material";


const TasksByDateListPaper = {
    height: '100%',
    borderRadius: '15px',
    boxShadow: 'none',
    padding: '20px',
}

export function TasksByDateList(): React.ReactElement {

  const tasks = useUnit($tasks);
  console.log(tasks);
  
  return (
    <div className={styles['tasks-by-date-list']}>
      <Paper sx={TasksByDateListPaper}>
        <div className={styles['tasks-by-date-list__header']}>
          Задачи
          <div className={styles['tasks-by-date-list__filter-icon']}><FilterAlt/></div>
        </div>
        <div className={styles['tasks-by-date-list__list']}>
          {tasks.map(task => (
              <TaskByDateCard key={task.id} taskData={task}/>
          ))}
        </div>
      </Paper>
    </div>
  )
};