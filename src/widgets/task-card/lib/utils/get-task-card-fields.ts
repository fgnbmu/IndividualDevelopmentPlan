import { TaskParams } from "../../../../shared/types/task-params";

export const getTaskCardFields = (taskData: TaskParams) => [
    { name: "Дата", value: taskData.date },
    { name: "Описание", value: taskData.description?.trim() || 'Не указано' },
    { name: "Категория", value: taskData.category?.trim() || 'Не указана' },
    { name: "Ответственный", value: taskData.assignee?.join(', ') || 'Не указан' },
];