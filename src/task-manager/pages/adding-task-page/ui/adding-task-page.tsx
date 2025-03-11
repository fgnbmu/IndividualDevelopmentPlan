import React, { useState } from "react";
import { useUnit} from 'effector-react';

import Button from '@mui/material/Button';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateField } from '@mui/x-date-pickers/DateField';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import dayjs from 'dayjs';

import { addingNewTaskEvent, $tasksList } from "../../../model/tasks-list";

import styles from './adding-task-page.module.css';

export function AddingTaskPage(): React.ReactNode {
  const [taskTitle, setTaskTitle] = useState('');
  const [taskDate, setTaskDate] = useState<dayjs.Dayjs | null>(null);

  const addingNewTask = useUnit(addingNewTaskEvent);

  const handleAddTask = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (taskTitle && taskDate) {
      addingNewTask({ title: taskTitle, date: taskDate.format('YYYY-MM-DD') });
    }
    console.log($tasksList.getState());
  };

  return (
    <Box 
      component="form"
      onSubmit={handleAddTask}
      className={styles['adding-task-page__form']}
    >
      <h1>Добавление задачи</h1>
      <TextField 
        value={taskTitle}
        onChange={(e) => setTaskTitle(e.target.value)}
        id="outlined-basic" 
        label="Название задачи" 
        variant="outlined"
        size="small"
        className={styles['adding-task-page__text-field']}
      />
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DateField
          value={taskDate}
          onChange={(newValue) => setTaskDate(newValue)}
          label="Выберите дату" 
          size="small"
          className={styles['adding-task-page__date-field']}
        />
      </LocalizationProvider>
      <Button 
        type="submit"
        variant="contained" 
        color="primary"
        className={styles['adding-task-page__button']}
        size="small"
        disabled={!taskTitle || !taskDate}
      >
        Добавить задачу
      </Button>
    </Box>
  );
};
