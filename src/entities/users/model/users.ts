import { createStore, createEvent } from 'effector';

// Создаем новый стор для текущего пользователя с правильным типом
type User = { id: string; name: string; email: string };
export const $currentUser = createStore<User | null>(null);

export const loginEvent = createEvent<User>();

// Обновляем состояние текущего пользователя при входе
$currentUser.on(loginEvent, (_, user) => user);
