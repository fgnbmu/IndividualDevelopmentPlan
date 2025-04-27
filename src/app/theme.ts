import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    primary: {
      main: '#006838',
    },
    secondary: {
      main: '#dc004e',
    },
  },
  typography: {
    fontFamily: 'Montserrat, Arial, sans-serif',
    fontSize: 10,
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: '#F9F9F9',
          borderRadius: '15px',
          boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
          padding: '15px',
        },
      },
    },
    MuiCardHeader: {
      styleOverrides: {
        root: {
          fontWeight: 600,
          fontSize: 10,
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          minWidth: '0px', 
          padding: '0px',
          borderRadius: '2px'
        },
      },
    },
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          backgroundColor: '#DAEFE6',
          color: '#96A09C'
        },
      },
    },
    // MuiSnackbar: {
    //   styleOverrides: {
    //     root: {
    //       backgroundColor: '#323232',
    //       color: '#ffffff',
    //       borderRadius: '8px',
    //     },
    //   },
    // },
  },
});