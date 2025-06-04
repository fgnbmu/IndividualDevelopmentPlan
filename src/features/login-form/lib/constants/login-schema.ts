import * as yup from 'yup';

export const LOGIN_SCHEMA = yup.object().shape({
  email: yup.string().required("Обязательно").email("Некорректный адрес"),
  password: yup.string().required("Обязательно"),
});