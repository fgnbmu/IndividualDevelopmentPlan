import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { TextField, Button, Box } from '@mui/material';
import { USERS_MOCK_DATA } from '../../../entities/users';
import { loginEvent } from '../../../entities/users';
import { useNavigate } from 'react-router-dom';
import { LoginData } from '../types';
import { LOGIN_SCHEMA } from '../lib/constants';

const LoginFormBox = {
  display: "flex",
  flexDirection: "column",
};

export const LoginForm = () => {
  const navigateTo = useNavigate();
  const methods = useForm<LoginData>({ resolver: yupResolver(LOGIN_SCHEMA) });
  const { control, handleSubmit, formState: { errors }, reset, setError } = methods;

  const submitHandler = async (data: LoginData) => {
    try {
      const user = USERS_MOCK_DATA.find(
        (u) => u.email === data.email && u.password === data.password
      );

      if (!user) {
        setError("password", { type: "manual", message: "Неверный email или пароль" });
        return;
      }

      loginEvent({ id: user.id, name: user.name, email: user.email });
      navigateTo("/");
      reset();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Box
      sx={LoginFormBox}
    >
      <form onSubmit={handleSubmit(submitHandler)}>
        <Controller
          name="email"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <TextField
              {...field}
              label="Email"
              type="email"
              fullWidth
              margin="normal"
              error={!!errors?.email}
              helperText={errors?.email?.message || ""}
              required
            />
          )}
        />

        <Controller
          name="password"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <TextField
              {...field}
              label="Пароль"
              type="password"
              fullWidth
              margin="normal"
              error={!!errors?.password}
              helperText={errors?.password?.message || ""}
              required
            />
          )}
        />

        <Button variant="contained" color="primary" type="submit" fullWidth>
          Войти
        </Button>
      </form>
    </Box>
  );
};