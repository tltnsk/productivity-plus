import { createTheme, type PaletteMode } from '@mui/material';

export const createAppTheme = (mode: PaletteMode) =>
  createTheme({
    palette: {
      mode,
      ...(mode === 'dark'
        ? {
            background: {
              default: '#10151a', 
              paper: '#181e24',   
            },
            primary: { main: '#6a82fb' },
            secondary: { main: '#ff63e9' },
          }
        : {
            background: {
              default: '#ede6ed', 
              paper: '#ffffff',
            },
            primary: { main: '#f55b87' },
            secondary: { main: '#f2e0c4' },
          }),
    },
    typography: {
      fontFamily: 'Kode Mono, monospace',
    },
  });
