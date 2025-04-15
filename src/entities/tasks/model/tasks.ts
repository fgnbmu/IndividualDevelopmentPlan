import { createEvent, createStore, sample } from 'effector';
import { TaskParams } from '../../../shared/types/task-params';

export const $tasks = createStore<TaskParams[]>([]);

export const addingNewTaskEvent = createEvent<TaskParams>();
export const updateTaskStatusEvent = createEvent<{ id: string; newStatus: string }>();

sample({
  clock: addingNewTaskEvent,
  source: $tasks,
  fn: (prevTasks, newTask) => {
    const updatedTasksList = [...prevTasks, newTask];
    return updatedTasksList;
  },
  target: $tasks,
});

sample({
  clock: updateTaskStatusEvent,
  source: $tasks,
  fn: (prevTasks, { id, newStatus }) => {
    return prevTasks.map(task => 
      task.id === id ? { ...task, status: newStatus } : task
    );
  },
  target: $tasks,
});
