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
      primary: '#021130',
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
          backgroundColor: '#006838',
          fontSize: '12px',
          borderRadius: '5px'
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
          width: '95%'
        }
      }
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          width: 300,
          alignItems: 'center'
        }
      }
    },
    MuiListItem: {
      styleOverrides: {
        root: {
          width: 220,
        }
      }
    },
    MuiListItemText: {
      styleOverrides: {
        primary: {
          fontSize: 13,
          color: '#4F5459',
        }
      }
    },
    MuiListItemButton: {
      styleOverrides: {
        root: {
          "&:hover": {
            backgroundColor: "#F5F8F7",
          },
          borderRadius: 10,
          paddingLeft: 20
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: '10px'
        }
      }
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '15px'
        }
      }
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          borderRadius: '15px',
          padding: '10px'
        }
      }
    },
    MuiPopover: {
      styleOverrides: {
        paper: {
          borderRadius: '15px',
        }
      }
    }
  },
});