import Footer from '../components/Footer'
import '../styles/globals.css'
import { ThemeProvider, createTheme } from '@mui/material/styles';
import * as React from 'react';
import Context from '../contexts/Context';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

function MyApp({ Component, pageProps }) {
  const [registered, setRegistered] = React.useState(false);

  return (
    <>
      <ThemeProvider theme={darkTheme}>
        <Context.Provider value={{ registered, setRegistered }}>
          <Component {...pageProps} />
          {registered && <Footer />}
        </Context.Provider>
      </ThemeProvider>
    </>
  )
}

export default MyApp;
