import React, { useState, useEffect } from "react";
import styles from './task-page.module.css';
import { useUnit } from 'effector-react';
import { useNavigate, useParams } from 'react-router-dom';

import { Checkbox, FormControl, InputLabel, ListItemText, MenuItem, OutlinedInput, Select, SelectChangeEvent } from "@mui/material";
import Button from '@mui/material/Button';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateField } from '@mui/x-date-pickers/DateField';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import dayjs from 'dayjs';
import { v4 as uuidv4 } from 'uuid';

import { addingNewTaskEvent, fetchTaskEffect, fetchTaskEvent } from "../../../entities/tasks";
import { TaskStatuses, TaskCategories } from "../../../shared/types";
import { USERS_MOCK_DATA } from "../../../entities/users";

export const TaskPage = (): React.ReactElement => {
  const [taskTitle, setTaskTitle] = useState<string>('');
  const [taskDescription, setTaskDescription] = useState<string>('');
  const [taskDate, setTaskDate] = useState<dayjs.Dayjs | null>(null);
  const [taskStatus, setTaskStatus] = useState<string>('');
  const [taskCategory, setTaskCategory] = useState<string>('');
  const [taskAssignee, setTaskAssignee] = useState<string[]>([]);

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
      setTaskAssignee(result.assignee || []);
    }
  });

  const handleChangeAssignee = (event: SelectChangeEvent<typeof taskAssignee>): void => {
    const {
      target: { value },
    } = event;
    setTaskAssignee(
      typeof value === 'string' ? value.split(',') : value,
    );
  };

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
        assignee: taskAssignee,
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
        <TextField 
          value={taskDescription}
          onChange={(e): void => setTaskDescription(e.target.value)}
          id="outlined-basic" 
          label="Описание" 
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
            <MenuItem value={TaskStatuses.Scheduled}>{TaskStatuses.Scheduled}</MenuItem>
            <MenuItem value={TaskStatuses.Active}>{TaskStatuses.Active}</MenuItem>
          </Select>
        </FormControl>
        <FormControl className={styles['task-page__select']}>
          <InputLabel id="demo-multiple-checkbox-label">Ответственный</InputLabel>
          <Select
            labelId="demo-multiple-checkbox-label"
            id="demo-multiple-checkbox"
            multiple
            value={taskAssignee}
            onChange={handleChangeAssignee}
            input={<OutlinedInput label="Ответственный" />}
            renderValue={(selected) => selected.join(', ')}
          >
            {USERS_MOCK_DATA.map(({name, id}) => (
              <MenuItem key={id} value={name}>
                <Checkbox checked={taskAssignee.includes(name)} />
                <ListItemText primary={name} />
              </MenuItem>
            ))}
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
            <MenuItem value={TaskCategories.Private}>{TaskCategories.Private}</MenuItem>
            <MenuItem value={TaskCategories.Work}>{TaskCategories.Work}</MenuItem>
            <MenuItem value={TaskCategories.ShoppingList}>{TaskCategories.ShoppingList}</MenuItem>
          </Select>
        </FormControl>
        <Button 
          type="submit"
          variant="contained" 
          color="primary"
          className={styles['task-page__button']}
          disabled={!taskTitle || !taskDate || !taskStatus}
        >
          {id ? 'Сохранить изменения' : 'Создать задачу'}
        </Button>
      </Box>
    </div>
  );
};
