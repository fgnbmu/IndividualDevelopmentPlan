import { TaskCategories, TaskStatuses } from '../../../shared/types';
import { USERS_MOCK_DATA } from '../../users';

const today = new Date().toISOString().split('T')[0];

export const TASKS_MOCK_DATA = [
    {
        id: '1',
        title: 'Завершить проект',
        date: today,
        description: 'Завершить до конца недели.',
        status: TaskStatuses.Active,
        category: TaskCategories.Work,
        assignee: [USERS_MOCK_DATA[0].name, USERS_MOCK_DATA[1].name],
    },
    {
        id: '2',
        title: 'Купить продукты',
        date: today,
        description: 'Необходимы овощи и молочные продукты.',
        status: TaskStatuses.Closed,
        category: TaskCategories.ShoppingList,
        assignee: [USERS_MOCK_DATA[2].name],
    },
    {
        id: '3',
        title: 'Записаться к врачу',
        date: today,
        description: 'Необходима консультация по причинам боли.',
        status: TaskStatuses.Scheduled,
        category: TaskCategories.Private,
        assignee: [],
    },
    {
        id: '4',
        title: 'Подготовить отчет',
        date: today,
        description: 'Собрать данные для quarterly report.',
        status: TaskStatuses.Active,
        category: TaskCategories.Work,
        assignee: [USERS_MOCK_DATA[0].name],
    },
    {
        id: '5',
        title: 'Забронировать отель',
        date: '2025-05-15',
        description: 'Необходимо уточнить время заезда.',
        status: TaskStatuses.Scheduled,
        category: TaskCategories.Private,
        assignee: [USERS_MOCK_DATA[1].name, USERS_MOCK_DATA[2].name],
    },
    {
        id: '6',
        title: 'Оплатить пошлину на загранпаспорт',
        date: '2025-05-10',
        description: '6000 рублей',
        status: TaskStatuses.Closed,
        category: TaskCategories.Private,
        assignee: [USERS_MOCK_DATA[1].name, USERS_MOCK_DATA[2].name],
    },
    {
        id: '7',
        title: 'Приборка в квартире',
        date: '2025-05-10',
        description: '',
        status: TaskStatuses.Closed,
        category: TaskCategories.Private,
        assignee: [USERS_MOCK_DATA[1].name, USERS_MOCK_DATA[2].name],
    },
];
