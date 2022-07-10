import { createTheme, ThemeProvider } from '@mui/material/styles';
import { SessionProvider } from "next-auth/react";
import Head from 'next/head';
import * as React from 'react';
import Navigation from '../components/Navigation';
import Context from '../contexts/Context';
import '../styles/globals.css';
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
  const [user, setUser] = React.useState({});
  const [darkMode, setDarkMode] = React.useState(false);
  const [inApp, setInApp] = React.useState(false);
  const colorMode = React.useMemo(
    () => ({
      toggleColorMode: () => {
        fetch(`/api/user/${user._id}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ darkMode: !darkMode })
        });
        setDarkMode(!darkMode);
      },
    }),
    [darkMode, setDarkMode, user._id],
  );
  return (
    <>
      <Head>
        <title>Pisces Dating</title>
        <meta name="description" content="Dating app" />
        <link rel="icon" href="/pisces.ico" />
      </Head>
      <SessionProvider session={session}>
        <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
          <Context.Provider value={{ user, setUser, darkMode, setDarkMode, colorMode, setInApp }}>
            <div className={darkMode ? styles.darkMode : (inApp ? styles.lightMode : undefined)}>
              {inApp && <Navigation />}
              <Component {...pageProps} />
            </div>
          </Context.Provider>
        </ThemeProvider>
      </SessionProvider>
    </>
  )
}

export default MyApp;
