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
              color: mode === 'dark' ? '#867ffa' : '#faab34',
              filter: 'drop-shadow(0 2px 6px rgba(0, 0, 0, 0.25))',
            },
            color: mode === 'dark' ? '#1b3ff2' : '#ee3f71',
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
              secondary: '#b5e0eb', // light cyan
            },
            form: {main: '#7d878a'}
          }
        : {
            background: {
              default: '#ede6ed', 
              paper: '#ffffff',
            },
            primary: { main: '#f55b87' },
            secondary: { main: '#f2e0c4' },
            text: {
              primary: '#664848', // brown
              secondary: '#784859', // cherry
            },
            form: {main: '#664848'}
          }),
    },
    typography: {
      fontFamily: 'Kode Mono, monospace',
    },
  });
