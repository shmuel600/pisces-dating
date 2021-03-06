import { createTheme, ThemeProvider } from '@mui/material/styles';
import { SessionProvider } from "next-auth/react";
import Head from 'next/head';
import React, { useEffect } from 'react';
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
  const [darkMode, setDarkMode] = React.useState(null);
  const [inApp, setInApp] = React.useState(false);
  const [fullHeight, setFullHeight] = React.useState(null);
  const [currentHeight, setCurrentHeight] = React.useState(null);
  const [keyboardOpen, setKeyboardOpen] = React.useState(false);
  const [isMobile, setIsMobile] = React.useState(false);
  const [mute, setMute] = React.useState(false);

  useEffect(() => {
    const theme = JSON.parse(localStorage.getItem('darkMode'));
    if (theme) setDarkMode(JSON.parse(localStorage.getItem('darkMode')));
    const muteMessages = JSON.parse(localStorage.getItem('mute'));
    if (muteMessages) setMute(JSON.parse(localStorage.getItem('mute')));
    const handleResize = () => {
      setIsMobile(globalThis.innerWidth < 768);
      setCurrentHeight(globalThis.innerHeight);
    };
    setFullHeight(globalThis.innerHeight);
    globalThis.addEventListener('resize', handleResize);
    handleResize();
    return () => globalThis.removeEventListener('resize', handleResize);
  }, []);
  useEffect(() => {
    if (isMobile) setKeyboardOpen(fullHeight * 0.7 > currentHeight);
  }, [isMobile, fullHeight, currentHeight, keyboardOpen]);
  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
    console.log("theme saved to local storage. dark mode: ", darkMode === null ? false : darkMode);
  }, [darkMode]);
  useEffect(() => {
    localStorage.setItem('mute', JSON.stringify(mute));
    console.log("mute messages: ", mute === null ? false : mute);
  }, [mute]);

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
          <Context.Provider value={{
            user, setUser, darkMode, setDarkMode, colorMode, setInApp, isMobile, keyboardOpen, fullHeight, currentHeight, mute, setMute
          }}>
            <div className={darkMode ? styles.darkMode : (inApp ? styles.lightMode : undefined)}>
              {inApp && !keyboardOpen && <Navigation />}
              <Component {...pageProps} />
            </div>
          </Context.Provider>
        </ThemeProvider>
      </SessionProvider>
    </>
  )
}

export default MyApp;
