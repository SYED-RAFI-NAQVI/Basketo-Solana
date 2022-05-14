import '../styles/globals.css';
import {createTheme, ThemeProvider} from '@mui/material/styles';

function MyApp({ Component, pageProps }) {

  const theme = createTheme({
    typography:{
      fontFamily:'Mulish'
    },
    components:{
      MuiButton:{
        styleOverrides:{
          root:{
            textTransform:'none'
          }
        }
      }
    }
  })

  return (
    <ThemeProvider theme={theme} >
    <Component {...pageProps} />
    </ThemeProvider>
  )
}

export default MyApp
