import React, { useRef, useState } from "react";
import { useUnit} from 'effector-react';

import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import Button from '@mui/material/Button';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateField } from '@mui/x-date-pickers/DateField';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import dayjs from 'dayjs';

import { addingNewTaskEvent, $tasksList } from "../../../model/tasks-list";
import { INITIAL_TASK_INDEX } from "../lib/constants";

import styles from './task-settings.module.css';

export function TaskSettings(): React.ReactElement {
  const [taskTitle, setTaskTitle] = useState<string>('');
  const [taskDescription, setTaskDescription] = useState<string>('');
  const [taskDate, setTaskDate] = useState<dayjs.Dayjs | null>(null);
  const [taskStatus, setTaskStatus] = useState<string>('');
  const newTaskIndex = useRef<number>(INITIAL_TASK_INDEX);

  const addingNewTask = useUnit(addingNewTaskEvent);

  const handleAddTask = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    if (taskTitle && taskDate) {
      addingNewTask({ 
        id: newTaskIndex.current++,
        title: taskTitle, 
        date: taskDate.format('YYYY-MM-DD'), 
        status: taskStatus, 
        description: taskDescription 
      });
    }
    console.log($tasksList.getState());
  };

  return (
    <Box 
      component="form"
      onSubmit={handleAddTask}
      className={styles['task-settings__form']}
    >
      <TextField 
        value={taskTitle}
        onChange={(e): void => setTaskTitle(e.target.value)}
        id="outlined-basic" 
        label="Название задачи" 
        variant="outlined"
        size="small"
        className={styles['task-settings__text-field']}
      />
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DateField // +время
          value={taskDate}
          onChange={(newValue): void => setTaskDate(newValue)}
          label="Выберите дату" 
          size="small"
          className={styles['task-settings__date-field']}
        />
      </LocalizationProvider>
      <TextField 
        value={taskDescription}
        onChange={(e): void => setTaskDescription(e.target.value)}
        id="outlined-basic" 
        label="Описание" 
        variant="outlined"
        size="small"
        className={styles['task-settings__text-field']}
      />
      <FormControl
        size="small"
      >
        <InputLabel>Статус задачи</InputLabel>
        <Select
          value={taskStatus}
          onChange={(e): void => setTaskStatus(e.target.value)}
          label="Статус задачи"
        >
          <MenuItem value={'Scheduled'}>Scheduled</MenuItem>
          <MenuItem value={'Active'}>Active</MenuItem>
          <MenuItem value={'Closed'}>Closed</MenuItem>
        </Select>
      </FormControl>
      <Button 
        type="submit"
        variant="contained" 
        color="primary"
        className={styles['task-settings__button']}
        size="small"
        disabled={!taskTitle || !taskDate} // продумать логику обновления кнопки
      >
        Добавить задачу
      </Button>
    </Box>
  );
};