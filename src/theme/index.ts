import { createTheme, type PaletteMode } from '@mui/material';

export const createAppTheme = (mode: PaletteMode) =>
  createTheme({
    components:
    {
      MuiIconButton: {
        styleOverrides: {
          root: {
            '&:hover': {
              backgroundColor: 'transparent',
              color: '#f0d75b',
            },
            color: '#1b3ff2',
            transition: 'color 0.2s, filter 0.2s',
          },
        },
      },
    },
    palette: {
      mode,
      ...(mode === 'dark'
        ? {
            background: {
              default: '#10151a', 
              paper: '#181e24',   
            },
            primary: { main: '#6a82fb', light: "#004fb0",  dark: "#04346e"},
            secondary: { main: '#ff63e9' },
            text: {
              primary: '#f1f6fa', // light light blue
              secondary: '#515b94', // light cyan
            },
            form: {main: '#7d878a'},
            grid: {
              twenty: '#84acfa',
              forty: '#77a3fc',
              sixty: '#417ffa',
              eighty: '#1f66f2',
              hundred: '#0845bf'
            }
          }
        : {
            background: {
              default: '#faf8f5', 
              paper: '#ffffff',
            },
            primary: { main: '#333333', light: "#6b6a6a",  dark: "#302f2f"},
            secondary: { main: '#544d4d' },
            text: {
              primary: '#333333', 
              secondary: '#636363', 
            },
            form: {main: '#7d878a'},
            grid: {
              twenty: '#cfcccc',
              forty: '#aba7a7',
              sixty: '#9c8080',
              eighty: '#807e7e',
              hundred: '#525050'
            }
          }),
    },
    typography: {
      fontFamily: 'Kode Mono, monospace',
    },
  });
