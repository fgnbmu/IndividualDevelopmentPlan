import { Paper, Typography, Box } from '@mui/material';
import { LoginForm } from '../../../features/login-form';
import styles from './auth-page.module.css';

const AuthPageBoxStyles = {
  display: 'flex',
  justifyContent: 'center',
  height: 'fit-content',
};

const AuthPagePaperStyles = { padding: 4, width: 400, borderRadius: '10px', };

export const AuthPage = () => {
  return (
    <div className={styles['auth-page']}>
      <Box
      sx={AuthPageBoxStyles}
    >
      <Paper elevation={3} sx={AuthPagePaperStyles}>
        <Typography variant="h5" component="h1" gutterBottom>
          Вход
        </Typography>
        <LoginForm />
      </Paper>
    </Box>
    </div>
  );
};