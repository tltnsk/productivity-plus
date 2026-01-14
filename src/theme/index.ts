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
              color: mode === 'dark' ? '#f0d75b' : '#faab34',
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
              default: '#ede6ed', 
              paper: '#ffffff',
            },
            primary: { main: '#f55b87' },
            secondary: { main: '#f2e0c4' },
            text: {
              primary: '#664848', // brown
              secondary: '#784859', // cherry
            },
            form: {main: '#664848'},
            grid: {
              twenty: '#ffbff6',
              forty: '#fc9df0',
              sixty: '#ff6beb',
              eighty: '#f540dd',
              hundred: '#a31a91'
            }
          }),
    },
    typography: {
      fontFamily: 'Kode Mono, monospace',
    },
  });
