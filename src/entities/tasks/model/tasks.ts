import { createEffect, createEvent, createStore, sample } from 'effector';
import { TaskParams } from '../../../shared/types/task-params';
import { TASKS_MOCK_DATA } from '../lib/constants/tasks-mock-data';

export const $tasks = createStore<TaskParams[]>(TASKS_MOCK_DATA);

export const addingNewTaskEvent = createEvent<TaskParams>();
export const updateTaskStatusEvent = createEvent<{ id: string; newStatus: string }>();
export const fetchTaskEvent = createEvent<string>();
export const removeTaskEvent = createEvent<string>();

export const fetchTaskEffect = createEffect<string, TaskParams | undefined, Error>(async (id) => {
  const tasks = await $tasks.getState();
  const task = tasks.find(task => task.id === id);
  return task;
});

sample({
  clock: addingNewTaskEvent,
  source: $tasks,
  fn: (prevTasks, newTask) => {
    const taskExists = prevTasks.some(task => task.id === newTask.id);
    
    if (taskExists) {
      return prevTasks.map(task => 
        task.id === newTask.id ? newTask : task
      );
    }

    return [...prevTasks, newTask];
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

sample({
  clock: fetchTaskEvent,
  target: fetchTaskEffect,
});

sample({
  clock: removeTaskEvent,
  source: $tasks,
  fn: (prevTasks, id) => {
    return prevTasks.filter(task => task.id !== id);
  },
  target: $tasks,
});


