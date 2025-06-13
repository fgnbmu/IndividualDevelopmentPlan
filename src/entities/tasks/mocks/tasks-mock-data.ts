import { TaskCategories, TaskStatuses } from '../../../shared/types';

const date = new Date();

const today = date.toISOString().split('T')[0];

const tomorrowDate = date;
tomorrowDate.setDate(tomorrowDate.getDate() + 1);
const tomorrow = tomorrowDate.toISOString().split('T')[0];

export const TASKS_MOCK_DATA = [
    {
        id: '1',
        title: 'Завершить проект',
        date: today,
        description: 'Завершить до конца недели.',
        status: TaskStatuses.Active,
        category: TaskCategories.Work,
        assignee: ['1', '3'],
    },
    {
        id: '2',
        title: 'Купить продукты',
        date: today,
        description: 'Необходимы овощи и молочные продукты.',
        status: TaskStatuses.Closed,
        category: TaskCategories.ShoppingList,
        assignee: ['3'],
    },
    {
        id: '3',
        title: 'Записаться к врачу',
        date: today,
        description: 'Необходима консультация по причинам боли.',
        status: TaskStatuses.Scheduled,
        category: TaskCategories.Private,
        assignee: ['1'],
    },
    {
        id: '4',
        title: 'Подготовить отчет',
        date: '2025-07-10',
        description: 'Собрать данные для quarterly report.',
        status: TaskStatuses.Active,
        category: TaskCategories.Work,
        assignee: ['1'],
    },
    {
        id: '5',
        title: 'Забронировать отель',
        date: tomorrow,
        description: 'Необходимо уточнить время заезда.',
        status: TaskStatuses.Scheduled,
        category: TaskCategories.Private,
        assignee: ['2'],
    },
    {
        id: '6',
        title: 'Оплатить пошлину на загранпаспорт',
        date: '2025-06-10',
        description: '6000 рублей',
        status: TaskStatuses.Closed,
        category: TaskCategories.Private,
        assignee: ['2', '3'],
    },
    {
        id: '7',
        title: 'Приборка в квартире',
        date: today,
        description: '',
        status: TaskStatuses.Closed,
        category: TaskCategories.Private,
        assignee: ['1', '2', '3'],
    },
    {
        id: '8',
        title: 'Собрать вещи в путешествие',
        date: '2025-06-11',
        description: '',
        status: TaskStatuses.Scheduled,
        category: TaskCategories.Private,
        assignee: ['1', '2', '3'],
    },
];
