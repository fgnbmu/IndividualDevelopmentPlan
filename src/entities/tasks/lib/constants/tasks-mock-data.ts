import { TaskCategories, TaskStatuses } from '../../../../shared/types';
import { USERS_MOCK_DATA } from '../../../users/lib/constants';

export const TASKS_MOCK_DATA = [
    {
        id: '1',
        title: 'Завершить проект',
        date: '2025-04-24',
        description: 'Завершить до конца недели.',
        status: TaskStatuses.Active,
        category: TaskCategories.Work,
        assignee: [USERS_MOCK_DATA[0].name, USERS_MOCK_DATA[1].name],
    },
    {
        id: '2',
        title: 'Купить продукты',
        date: '2025-04-22',
        description: 'Необходимы овощи и молочные продукты.',
        status: TaskStatuses.Closed,
        category: TaskCategories.ShoppingList,
        assignee: [USERS_MOCK_DATA[2].name],
    },
    {
        id: '3',
        title: 'Записаться к врачу',
        date: '2025-04-25',
        description: 'Необходима консультация по причинам боли.',
        status: TaskStatuses.Scheduled,
        category: TaskCategories.Private,
        assignee: [],
    },
    {
        id: '4',
        title: 'Подготовить отчет',
        date: '2025-04-30',
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
    }
];
