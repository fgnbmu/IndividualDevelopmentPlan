import React, { useState, SyntheticEvent } from 'react';
import { TextField, Button, Paper, Typography, Box, Snackbar } from '@mui/material';
import { loginEvent, USERS_MOCK_DATA } from '../../../entities/users';
import { useNavigate } from 'react-router-dom';

export const AuthPage = (): React.ReactElement => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  
  const navigateTo = useNavigate();

  const handleSubmit = (e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    const user = USERS_MOCK_DATA.find(user => user.email === email && user.password === password);
    if (user) {
      loginEvent({ id: user.id, name: user.name, email: user.email });
      navigateTo("/home-page");
    } else {
      setErrorMessage('Неверный email или пароль');
      setOpenSnackbar(true);
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <Paper elevation={3} sx={{ padding: 4, width: 400 }}>
        <Typography variant="h5" component="h1" gutterBottom>
          Вход
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Email"
            type="email"
            fullWidth
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <TextField
            label="Пароль"
            type="password"
            fullWidth
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <Button variant="contained" color="primary" type="submit" fullWidth>
            Войти
          </Button>
        </form>
      </Paper>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={() => setOpenSnackbar(false)}
        message={errorMessage}
        anchorOrigin={{vertical: 'bottom', horizontal: 'right'}}
      />
    </Box>
  );
};
