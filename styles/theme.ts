import { Manrope } from 'next/font/google';
import { createTheme } from '@mui/material/styles';
import { red } from '@mui/material/colors';

const manrope = Manrope({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
});

const theme = createTheme({
  palette: {
    primary: {
      main: '#119c3c',
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: '#008627',
    },
    error: {
      main: red.A400,
    },
  },
  typography: {
    fontFamily: manrope.style.fontFamily,
    button: {
      fontFamily: manrope.style.fontFamily,
      fontWeight: 700,
      textTransform: 'none',
    },
  },
});

export default theme;
