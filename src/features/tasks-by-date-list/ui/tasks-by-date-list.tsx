import { Paper, Popover, List, ListItem, Divider, IconButton, Tooltip } from '@mui/material';
import React, { useState } from 'react';
import styles from './tasks-by-date-list.module.css';
import { TaskByDateCard } from './task-by-date-card';
import { AddCircle, FilterAlt } from '@mui/icons-material';
import { PeriodSelector } from '../../period-selector';
import { TasksPeriods } from '../../../shared/types/tasks-periods';
import { useNavigate } from 'react-router-dom';
import { getTasksDataByDate } from '../../../shared/lib/utils';
import { getTasksByUser } from '../../../shared/lib/utils/get-tasks-by-user';
import { UsersSelector } from '../../users-selector';
import { $currentUser } from '../../../entities/users';
import { useUnit } from 'effector-react';

const TasksByDateListPaper = {
  height: '100%',
  borderRadius: '15px',
  boxShadow: 'none',
  padding: '20px',
};

const TasksByDateListPopoverList = {width: 350, height: 95};
const TasksByDateListPopoverListItem = {width: 350};

export const TasksByDateList = (): React.ReactElement => {
  const currentUser = useUnit($currentUser);
  const [anchorEl, setAnchorEl] = useState<null | HTMLButtonElement>(null);
  const [selectedPeriod, setSelectedPeriod] = useState(TasksPeriods.Today);
  const [selectedUserId, setSelectedUserId] = useState<string>(currentUser?.id || '');
  const { filteredByDateTasks } = getTasksDataByDate(selectedPeriod);
  const filteredByUsersTasks = getTasksByUser(selectedUserId);
  const filteredTasks = filteredByDateTasks.filter(
    task => filteredByUsersTasks.findIndex(t => t.id === task.id) !== -1
  );

  const navigateTo = useNavigate();

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const isPopoverOpened = Boolean(anchorEl);

  return (
    <div className={styles['tasks-by-date-list']}>
      <Paper sx={TasksByDateListPaper}>
        <div className={styles['tasks-by-date-list__header']}>
          <div className={styles['tasks-by-date-list__header-label']}>Задачи</div>
          <div className={styles['tasks-by-date-list__icons']}>
            <Tooltip title='Добавить задачу'>
              <IconButton onClick={() => navigateTo('/task')}><AddCircle /></IconButton>
            </Tooltip>
            <Tooltip title='Фильтры'>
              <IconButton onClick={handleClick}><FilterAlt /></IconButton>
            </Tooltip>
          </div>
        </div>
        <Popover
          open={isPopoverOpened}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
        >
          <List sx={TasksByDateListPopoverList} disablePadding>
            <ListItem sx={TasksByDateListPopoverListItem}>
              <div className={styles['tasks-by-date-list__filter-title']}>Пользователь:</div>
              <UsersSelector selectedUserId={selectedUserId} onUserChange={setSelectedUserId} selectorWidth={200}/>
            </ListItem>
            <Divider />
            <ListItem sx={TasksByDateListPopoverListItem}>
              <div className={styles['tasks-by-date-list__filter-title']}>Период:</div>
            <PeriodSelector selectedPeriod={selectedPeriod} onPeriodChange={setSelectedPeriod} selectorWidth={200}/>
            </ListItem>
          </List>
        </Popover>
        {!filteredTasks.length ? 
          ( <div className={styles['tasks-by-date-list__empty']}>Нет задач на этот период</div> ) : (
            <div className={styles['tasks-by-date-list__list']}>
                {filteredTasks.map(task => (
                    <TaskByDateCard key={task.id} taskData={task} />
                ))}
            </div>
          )}
      </Paper>
    </div>
  );
};