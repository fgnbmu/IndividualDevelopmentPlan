import { USERS_MOCK_DATA } from "../../../../entities/users";
import { TASK_CATEGORIES_OPTIONS } from "../../../../shared/lib/constants";
import { TaskCategories } from "../../../../shared/types";
import { TaskParams } from "../../../../shared/types/task-params";

export const getTaskCardFields = (taskData: TaskParams) => [
  { name: "Дата", value: taskData.date },
  { name: "Описание", value: taskData.description?.trim() || 'Не указано' },
  { name: "Категория", value: taskData.category && TASK_CATEGORIES_OPTIONS[taskData.category as TaskCategories] || 'Не указана' },
  {
    name: "Ответственный(-ые)",
    value: taskData.assignee
      ?.map((assigneeId) => {
        const user = USERS_MOCK_DATA.find(user => user.id === assigneeId);
        return user?.name ?? '';
      })
      .join(', ')
      || 'Не указан',
  },
];