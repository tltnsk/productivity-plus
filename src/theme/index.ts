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
              default: '#fdfcfd', 
              paper: '#ffffff',
            },
            primary: { main: '#ee3f71' },
            secondary: { main: '#f4b860' },
          }),
    },
    typography: {
      fontFamily: 'Kode Mono, monospace',
    },
  });

const theme = createAppTheme('dark');
export default theme;