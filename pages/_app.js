import Head from 'next/head';
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
  const [user, setUser] = React.useState({});
  const userId = `62c570cbc3aa5ff2a7e1eb5e`;
  return (
    <>
      <Head>
        <title>Pisces Dating</title>
        <meta name="description" content="Dating app" />
        <link rel="icon" href="/pisces.ico" />
      </Head>
      <ThemeProvider theme={darkTheme}>
        <Context.Provider value={{ registered, setRegistered, user, setUser, userId }}>
          <Component {...pageProps} />
          {registered && <Footer />}
        </Context.Provider>
      </ThemeProvider>
    </>
  )
}

export default MyApp;
