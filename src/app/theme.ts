import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    primary: {
      main: '#006838',
    },
    secondary: {
      main: '#D9E8E1',
    },
    text: {
      primary: '#001D10',
      secondary: '#006838',
    }
  },
  typography: {
    fontFamily: 'Montserrat, Arial, sans-serif',
    fontSize: 10,
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: '15px',
          boxShadow: 'none',
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
    MuiLinearProgress: {
      styleOverrides: {
        root: {
          height: 5,
          backgroundColor: '#006838',
          borderRadius: 5,
          width: 150
        },
        bar: {
          borderRadius: 5,
        }
      }
    }
  },
});