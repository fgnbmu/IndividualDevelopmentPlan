import React, { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useUnit } from 'effector-react';
import { useParams } from 'react-router-dom';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateField } from '@mui/x-date-pickers/DateField';
import { Checkbox, FormControl, IconButton, InputLabel, ListItemText, MenuItem, OutlinedInput, Select, Tooltip } from "@mui/material";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import dayjs from 'dayjs';
import { v4 as uuidv4 } from 'uuid';

import { addingNewTaskEvent, $tasks, updateTaskEvent } from "../../../entities/tasks";
import { USERS_MOCK_DATA } from "../../../entities/users";
import { TASK_CATEGORIES_OPTIONS, TASK_STATUSES_OPTIONS } from "../../../shared/lib/constants";
import styles from './task-page.module.css';
import { TASK_VALIDATION_SCHEMA } from '../lib/constants';
import { TaskFormParams } from '../types';
import { $currentUser } from '../../../entities/users';
import { ArrowBackIosNew } from '@mui/icons-material';

const IconArrowBackStyles = {color: 'var(--main-color)'};
const IconButtonStyles = {height:'fit-content'};

export const TaskPage = (): React.ReactElement => {
  const { id } = useParams<{ id: string }>();
  const [tasks, addingNewTask, updateTask] = useUnit([$tasks, addingNewTaskEvent, updateTaskEvent]);
  const currentUser = useUnit($currentUser);

  const today = dayjs();

  const { register, handleSubmit, reset, watch, control, formState: { errors } } = useForm<TaskFormParams>({
    resolver: yupResolver(TASK_VALIDATION_SCHEMA),
  });

  const watchedValues = watch();

  useEffect(() => {
    if (id) {
      const foundTask = tasks.find(task => task.id === id);
      if (foundTask) {
        reset({
          title: foundTask.title,
          description: foundTask.description || '',
          date: dayjs(foundTask.date).format('DD.MM.YYYY'),
          status: foundTask.status,
          category: foundTask.category || '',
          assignee: foundTask.assignee || [],
          comment: foundTask.comment,
          creator: currentUser?.id,
        });
      }
    }
  }, [id, tasks, reset]);

  const handleSaveTask = ({ title, date, status, description, category, assignee, comment }: TaskFormParams): void => {
    if (title && date && status && assignee) {
      const formattedDate = dayjs(date, 'DD.MM.YYYY').format('YYYY-MM-DD');
      const taskId = id || uuidv4();

      if (id) {
        updateTask({ 
          id: taskId,
          title, 
          date: formattedDate, 
          status, 
          description,
          category,
          assignee,
          comment,
          creator: currentUser?.id,
        });
      } else {
        addingNewTask({ 
          id: taskId,
          title, 
          date: formattedDate, 
          status, 
          description,
          category,
          assignee,
          comment,
          creator: currentUser?.id,
        });
      }
    
      window.history.back();
    }
  };

  const isValidDate = (dateStr?: string) => {
    if (!dateStr) return false;
    const parsedDate = dayjs(dateStr, 'DD.MM.YYYY');
    return !parsedDate.isBefore(today) && parsedDate.isValid();
  };


  return (
    <div className={styles['task-page']}>
      <Tooltip title="Назад">
        <IconButton sx={IconButtonStyles} onClick={() => window.history.back()}>
          <ArrowBackIosNew sx={IconArrowBackStyles}/>
        </IconButton>
      </Tooltip>
      <Box 
        component="form" 
        onSubmit={handleSubmit(handleSaveTask)}
        className={styles['task-page__form']}
      >
        <div className={styles['task-page__main-fields']}>
          <TextField
            {...register('title')}
            label="Название задачи"
            variant="outlined"
            size="small"
            error={!!errors.title}
            className={styles['task-page__text-field']}
          />
          <TextField
            {...register('description')}
            label="Описание"
            variant="outlined"
            size="small"
            multiline
            rows={4}
            className={styles['task-page__text-field']}
          />
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Controller
              name="date"
              control={control}
              render={({ field: { onChange, value } }) => (
                <DateField
                  label="Выберите дату"
                  format="DD/MM/YYYY"
                  size="small"
                  shouldDisableDate={(date) => date.isBefore(today)}
                  value={value ? dayjs(value, 'DD.MM.YYYY') : null}
                  onChange={(newValue) => newValue !== null ? onChange(newValue.format('DD.MM.YYYY')) : onChange('')}
                  className={styles['task-page__date-field']}
                />
              )}
            />
          </LocalizationProvider>
          <FormControl size="small" className={styles['task-page__select']}>
            <InputLabel>Статус задачи</InputLabel>
            <Select
              {...register('status')}
              label="Статус задачи"
              value={watchedValues.status ? watchedValues.status : ''}
            >
              {Object.entries(TASK_STATUSES_OPTIONS).map(([key, name]) => (
                <MenuItem key={key} value={key}>{name}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl className={styles['task-page__select']}>
            <InputLabel id="demo-multiple-checkbox-label">Ответственный</InputLabel>
            <Select
              labelId="demo-multiple-checkbox-label"
              id="demo-multiple-checkbox"
              multiple
              value={Array.isArray(watchedValues.assignee) ? watchedValues.assignee : []}
              {...register('assignee')}
              input={<OutlinedInput label="Ответственный" />}
              renderValue={(selected) => selected.map(id => USERS_MOCK_DATA.find(u => u.id === id)?.name).join(', ')}
            >
              {USERS_MOCK_DATA.map(user => (
                <MenuItem key={user.id} value={user.id}>
                  <Checkbox checked={watchedValues.assignee?.includes(user.id)} />
                  <ListItemText primary={user.name} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl size="small" className={styles['task-page__select']}>
            <InputLabel>Категория задачи</InputLabel>
            <Select
              {...register('category')}
              label="Категория задачи"
              value={watchedValues.category ? watchedValues.category : ''}
            >
              {Object.entries(TASK_CATEGORIES_OPTIONS).map(([key, name]) => (
                <MenuItem key={key} value={key}>{name}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
        <div className={styles['task-page__secondary-fields']}>
          <TextField
            {...register('comment')}
            label="Комментарий"
            variant="outlined"
            size="small"
            multiline
            rows={5}
            className={styles['task-page__text-field']}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            className={styles['task-page__button']}
            disabled={
              !(watchedValues.title &&
              isValidDate(watchedValues.date) &&
              watchedValues.status &&
              Array.isArray(watchedValues.assignee) && watchedValues.assignee.length > 0)
            }
          >
            {id ? 'Сохранить изменения' : 'Создать задачу'}
          </Button>
        </div>
      </Box>
    </div>
  );
};