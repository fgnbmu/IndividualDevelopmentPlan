import { createEvent, createStore, sample } from 'effector';
import { TaskFields } from '../types';

export const $tasksList = createStore<TaskFields[]>([])

export const addingNewTaskEvent = createEvent<TaskFields>();

sample({
  clock: addingNewTaskEvent,
  source: $tasksList,
  fn: (prevTasks, newTask) => {
    return [...prevTasks, newTask]
  },
  target: $tasksList,
});
