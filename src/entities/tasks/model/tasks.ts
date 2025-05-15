import { createEvent, createStore, sample } from 'effector';
import { TaskParams } from '../../../shared/types/task-params';
import { TASKS_MOCK_DATA } from '../mocks';

export const $tasks = createStore<TaskParams[]>(TASKS_MOCK_DATA);

export const addingNewTaskEvent = createEvent<TaskParams>();
export const updateTaskEvent = createEvent<TaskParams>();
export const updateTaskStatusEvent = createEvent<{ id: string; newStatus: string }>();
export const removeTaskEvent = createEvent<string>();

sample({
  clock: addingNewTaskEvent,
  source: $tasks,
  fn: (prevTasks, newTask) => {
    return [...prevTasks, newTask];
  },
  target: $tasks,
});

sample({
  clock: updateTaskEvent,
  source: $tasks,
  fn: (prevTasks, updatedTask) => {
    return prevTasks.map(task =>
      task.id === updatedTask.id ? updatedTask : task
    );
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
  clock: removeTaskEvent,
  source: $tasks,
  fn: (prevTasks, id) => {
    return prevTasks.filter(task => task.id !== id);
  },
  target: $tasks,
});


