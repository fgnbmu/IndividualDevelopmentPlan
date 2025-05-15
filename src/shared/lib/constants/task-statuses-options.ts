import { TaskStatuses } from "../../types";

export const TASK_STATUSES_OPTIONS = {
    [TaskStatuses.Active]: 'В процессе',
    [TaskStatuses.Scheduled]: 'Запланировано',
    [TaskStatuses.Closed]: 'Выполнено',
};