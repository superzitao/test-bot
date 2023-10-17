import { Roboto, Barlow } from 'next/font/google'
import { createTheme } from '@mui/material/styles'
import { red } from '@mui/material/colors'

export const barlow = Barlow({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
})

// Create a theme instance.
const theme = createTheme({
  spacing: 1,
  palette: {
    mode: 'dark',
    primary: {
      main: '#39E0E2',
    },
    secondary: {
      main: '#39E285',
    },
    error: {
      main: red.A400,
    },
  },
  typography: {
    fontFamily: barlow.style.fontFamily,
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 640,
      md: 834,
      lg: 1400,
      xl: 1920,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'unset',
        },
      },
    },
  },
})

export default theme
