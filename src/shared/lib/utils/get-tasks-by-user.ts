import { TaskParams } from "../../types/task-params";
import { $currentUser } from "../../../entities/users";
import { $tasks } from "../../../entities/tasks";
import { useUnit } from "effector-react";

export const getTasksByUser = (selectedUserId: string): TaskParams[] => {
  const currentUser = useUnit($currentUser);
  const tasks = useUnit($tasks);

  if (selectedUserId === 'Все') return tasks;

  return tasks.filter(task => {
    if (selectedUserId === 'me') {
      return task.assignee?.includes(currentUser?.id ?? '');
    } else {
      return task.assignee?.includes(selectedUserId);
    }
  });
}