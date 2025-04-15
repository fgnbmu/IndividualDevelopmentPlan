import React, { useState, useEffect } from "react";
import styles from './task-page.module.css';
import { useUnit } from 'effector-react';
import { useNavigate, useParams } from 'react-router-dom';

import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import Button from '@mui/material/Button';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateField } from '@mui/x-date-pickers/DateField';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import dayjs from 'dayjs';
import { v4 as uuidv4 } from 'uuid';

import { addingNewTaskEvent, fetchTaskEffect, fetchTaskEvent } from "../../../entities/tasks/model/tasks";
import { TaskStatuses, TaskCategories } from "../../../shared/types";

export function TaskPage(): React.ReactElement {
  const [taskTitle, setTaskTitle] = useState<string>('');
  const [taskDescription, setTaskDescription] = useState<string>('');
  const [taskDate, setTaskDate] = useState<dayjs.Dayjs | null>(null);
  const [taskStatus, setTaskStatus] = useState<string>('');
  const [taskCategory, setTaskCategory] = useState<string>('');

  const { id } = useParams<{ id: string }>();
  const [addingNewTask, fetchTask] = useUnit([addingNewTaskEvent, fetchTaskEvent]);
  const navigateTo = useNavigate();

  useEffect(() => {
    if (id) {
      fetchTask(id);
    }
  }, [id]);
  
  fetchTaskEffect.done.watch(({ result }) => {
    if (result) {
      setTaskTitle(result.title);
      setTaskDescription(result.description || '');
      setTaskDate(dayjs(result.date));
      setTaskStatus(result.status);
      setTaskCategory(result.category || '');
    }
  });

  const handleAddTask = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    if (taskTitle && taskDate) {
      const taskId = id || uuidv4();
      addingNewTask({ 
        id: taskId,
        title: taskTitle, 
        date: taskDate.format('YYYY-MM-DD'), 
        status: taskStatus, 
        description: taskDescription,
        category: taskCategory,
      });
      navigateTo("/tasks-list");
    }
  };

  return (
    <div className={styles['task-page']}>
      <Box 
        component="form"
        onSubmit={handleAddTask}
        className={styles['task-page__form']}
      >
        <TextField 
          value={taskTitle}
          onChange={(e): void => setTaskTitle(e.target.value)}
          id="outlined-basic" 
          label="Название задачи" 
          variant="outlined"
          size="small"
          className={styles['task-page__text-field']}
        />
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DateField
            value={taskDate}
            onChange={(newValue): void => setTaskDate(newValue)}
            label="Выберите дату" 
            size="small"
            className={styles['task-page__date-field']}
          />
        </LocalizationProvider>
        <TextField 
          value={taskDescription}
          onChange={(e): void => setTaskDescription(e.target.value)}
          id="outlined-basic" 
          label="Описание" 
          variant="outlined"
          size="small"
          className={styles['task-page__text-field']}
        />
        <FormControl
          size="small"
          className={styles['task-page__select']}
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
          className={styles['task-page__select']}
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
          className={styles['task-page__button']}
          disabled={!taskTitle || !taskDate || !taskStatus}
        >
          {id ? 'Сохранить изменения' : 'Добавить задачу'}
        </Button>
      </Box>
    </div>
  );
};
