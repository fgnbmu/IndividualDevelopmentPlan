import { Paper } from '@mui/material';
import { useUnit } from 'effector-react';
import { TaskStatuses } from '../../../shared/types';
import { $tasks } from '../../../entities/tasks';
import styles from './overdue-tasks-list.module.css';
import { OverdueTaskCard } from './overdue-task-card';

const OverdueTasksListPaper = {
    height: '100%',
    borderRadius: '15px',
    boxShadow: 'none',
    padding: '20px',
};

export function OverdueTasksList(): React.ReactElement {
  const tasks = useUnit($tasks);
  const currentDate = new Date().toISOString().split('T')[0];

  const filteredTasks = tasks.filter(
    (task) =>
      !(task.status === TaskStatuses.Closed) &&
      task.date < currentDate
  );

  if (!filteredTasks.length) {
    return <Paper>Нет просроченных задач</Paper>;
  }

  return (
    <div className={styles['overdue-tasks-list']}>
      <Paper sx={OverdueTasksListPaper}>
        <div className={styles['overdue-tasks-list__header']}>Просроченные задачи</div>
        <div className={styles['overdue-tasks-list__list']}>
            {filteredTasks.map((task) => (
            <OverdueTaskCard taskData={task}/>
            ))}
        </div>
      </Paper>
    </div>
  );
}