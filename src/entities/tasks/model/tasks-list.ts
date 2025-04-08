import { createEvent, createStore, sample } from 'effector';
import { TaskParams } from '../../../shared/types/task-params';

export const $tasks = createStore<TaskParams[]>([]);

export const addingNewTaskEvent = createEvent<TaskParams>();

sample({
  clock: addingNewTaskEvent,
  source: $tasks,
  fn: (prevTasks, newTask) => {
    const updatedTasksList = [...prevTasks, newTask];
    return updatedTasksList;
  },
  target: $tasks,
});
