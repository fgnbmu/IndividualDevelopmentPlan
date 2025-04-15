import React, { useState } from "react";
import { useUnit } from 'effector-react';
import { useNavigate } from 'react-router-dom';

import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import Button from '@mui/material/Button';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateField } from '@mui/x-date-pickers/DateField';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import dayjs from 'dayjs';
import { v4 as uuidv4 } from 'uuid';

import { addingNewTaskEvent, $tasks } from "../../../entities/tasks/model/tasks";
import { TaskStatuses, TaskCategories } from "../../../shared/types";

import styles from './task-settings.module.css';

export function TaskSettings(): React.ReactElement {
  const [taskTitle, setTaskTitle] = useState<string>('');
  const [taskDescription, setTaskDescription] = useState<string>('');
  const [taskDate, setTaskDate] = useState<dayjs.Dayjs | null>(null);
  const [taskStatus, setTaskStatus] = useState<string>('');
  const [taskCategory, setTaskCategory] = useState<string>('');

  const addingNewTask = useUnit(addingNewTaskEvent);
  const navigateTo = useNavigate();

  const handleAddTask = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    if (taskTitle && taskDate) {
      addingNewTask({ 
        id: uuidv4(),
        title: taskTitle, 
        date: taskDate.format('YYYY-MM-DD'), 
        status: taskStatus, 
        description: taskDescription,
        category: taskCategory,
      });
    }
    console.log($tasks.getState());
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
        <DateField
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
        className={styles['task-settings__select']}
      >
        <InputLabel>Статус задачи</InputLabel>
        <Select
          value={taskStatus}
          onChange={(e): void => setTaskStatus(e.target.value)}
          label="Статус задачи"
        >
          <MenuItem value={TaskStatuses.Scheduled}>Запланировано</MenuItem>
          <MenuItem value={TaskStatuses.Active}>В процессе</MenuItem>
        </Select>
      </FormControl>
      <FormControl
        size="small"
        className={styles['task-settings__select']}
      >
        <InputLabel>Категория задачи</InputLabel>
        <Select
          value={taskCategory}
          onChange={(e): void => setTaskCategory(e.target.value)}
          label="Категория задачи"
        >
          <MenuItem value={TaskCategories.Private}>Личное</MenuItem>
          <MenuItem value={TaskCategories.Work}>Работа</MenuItem>
          <MenuItem value={TaskCategories.ShoppingList}>Список покупок</MenuItem>
        </Select>
      </FormControl>
      <Button 
        type="submit"
        variant="contained" 
        color="primary"
        className={styles['task-settings__button']}
        disabled={!taskTitle || !taskDate || !taskStatus} // Логика отключения кнопки ?
        onClick={() => navigateTo("/tasks-list")}
      >
        Добавить задачу
      </Button>
    </Box>
  );
};
