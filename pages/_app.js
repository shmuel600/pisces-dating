import Head from 'next/head';
import Footer from '../components/Footer'
import '../styles/globals.css'
import { ThemeProvider, createTheme } from '@mui/material/styles';
import * as React from 'react';
import Context from '../contexts/Context';
import { SessionProvider } from "next-auth/react";
import styles from '../styles/Home.module.css';


const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});
const lightTheme = createTheme({
  palette: {
    mode: 'light',
  },
});

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  const [dark, setDark] = React.useState(true);
  const colorMode = React.useMemo(
    () => ({
      toggleColorMode: () => {
        setDark(!dark);
      },
    }),
    [dark, setDark],
  );
  const [registered, setRegistered] = React.useState(false);
  const [keyboardOpen, setKeyboardOpen] = React.useState(false);
  const [user, setUser] = React.useState({});
  const userId = `62c570cbc3aa5ff2a7e1eb5e`;
  return (
    <>
      <Head>
        <title>Pisces Dating</title>
        <meta name="description" content="Dating app" />
        <link rel="icon" href="/pisces.ico" />
      </Head>
      <SessionProvider session={session}>
        <ThemeProvider theme={dark ? darkTheme : lightTheme}>
          <Context.Provider value={{ registered, setRegistered, user, setUser, userId, dark, setDark, colorMode, setKeyboardOpen }}>
            <div className={dark ? styles.darkMode : (registered ? styles.lightMode : undefined)}>
              {registered && !keyboardOpen && <Footer />}
              <Component {...pageProps} />
            </div>
          </Context.Provider>
        </ThemeProvider>
      </SessionProvider>
    </>
  )
}

export default MyApp;
