import { createEvent, createStore, sample } from 'effector';
import { TaskParams } from '../types/task-params';

export const $tasksList = createStore<TaskParams[]>([]);

export const addingNewTaskEvent = createEvent<TaskParams>();

sample({
  clock: addingNewTaskEvent,
  source: $tasksList,
  fn: (prevTasks, newTask) => {
    const updatedTasksList = [...prevTasks, newTask];
    return updatedTasksList;
  },
  target: $tasksList,
});
