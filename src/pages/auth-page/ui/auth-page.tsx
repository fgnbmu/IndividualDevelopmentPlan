import { Paper, Typography, Box } from '@mui/material';
import { LoginForm } from '../../../features/login-form';

export const AuthPage = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center'
      }}
    >
      <Paper elevation={3} sx={{ padding: 4, width: 400 }}>
        <Typography variant="h5" component="h1" gutterBottom>
          Вход
        </Typography>
        <LoginForm />
      </Paper>
    </Box>
  );
};