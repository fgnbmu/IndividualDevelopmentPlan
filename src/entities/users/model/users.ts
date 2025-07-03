import { createStore, createEvent } from 'effector';

type User = { id: string; name: string; email: string };

const initialStoredUser = localStorage.getItem('currentUser');
const initialUser = initialStoredUser ? JSON.parse(initialStoredUser) : null;

export const $currentUser = createStore<User | null>(initialUser);

export const loginEvent = createEvent<User>();
export const logoutEvent = createEvent<void>();

$currentUser
  .on(loginEvent, (_, user) => {
    localStorage.setItem('currentUser', JSON.stringify(user));
    return user;
  })
  .reset(logoutEvent);

logoutEvent.watch(() => {
  localStorage.removeItem('currentUser');
});