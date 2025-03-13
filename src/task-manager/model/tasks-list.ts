import { createEvent, createStore, sample } from 'effector';
import { TaskFields } from '../types';

export const $tasksList = createStore<TaskFields[]>(JSON.parse(localStorage.getItem('tasksList') || '[]'));

export const addingNewTaskEvent = createEvent<TaskFields>();

sample({
  clock: addingNewTaskEvent,
  source: $tasksList,
  fn: (prevTasks, newTask) => {
    const updatedTasksList = [...prevTasks, newTask];
    localStorage.setItem('tasksList', JSON.stringify(updatedTasksList));
    return updatedTasksList;
  },
  target: $tasksList,
});
