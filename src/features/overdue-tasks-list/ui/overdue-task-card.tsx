import { USERS_MOCK_DATA } from '../../../entities/users';
import { OverdueTaskCardProps } from '../types';
import styles from './overdue-tasks-list.module.css';

export function OverdueTaskCard(props: OverdueTaskCardProps): React.ReactElement {
  const { taskData } = props;

  return (
    <div className={styles['overdue-task-card']} key={taskData.id}>
        <div className={styles['overdue-task-card__title']}>{taskData.title}</div>
        <div>
        <div className={styles['overdue-task-card__assignee-title']}>Ответственный(-ые):</div>
          {taskData.assignee
            ?.map((assigneeId) => {
              const user = USERS_MOCK_DATA.find(user => user.id === assigneeId);
              return user?.name ?? '';
            })
            .join(', ')
            || 'Не указан'
          }
      </div>
        <div className={styles['overdue-task-card__date']}>{taskData.date}</div>
    </div>
  );
}