import * as Yup from 'yup';

export const TASK_VALIDATION_SCHEMA = Yup.object().shape({
  title: Yup.string().required('Введите название задачи'),
  date: Yup.string().required('Выберите дату выполнения'),
  status: Yup.string().required('Выберите статус'),
});