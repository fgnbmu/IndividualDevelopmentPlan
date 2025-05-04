import { createStore, createEvent } from 'effector';

type User = { id: string; name: string; email: string };
export const $currentUser = createStore<User | null>(null);

export const loginEvent = createEvent<User>();

$currentUser.on(loginEvent, (_, user) => user);