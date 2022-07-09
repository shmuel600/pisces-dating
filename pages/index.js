import { Brightness4, Brightness7 } from '@mui/icons-material';
import { Box, IconButton } from '@mui/material';
import { useRouter } from 'next/router';
import { signIn, signOut, useSession } from "next-auth/react";
import * as React from 'react';
import Pisces from '../components/Pisces';
import Context from '../contexts/Context';
import styles from '../styles/Home.module.css';

export default function Home() {
  const { data: session, status } = useSession();
  const loading = status === "loading";
  const { registered, dark, setWasDark, colorMode } = React.useContext(Context);
  const [fader, setFader] = React.useState(`${styles.fadeIn}`);
  const router = useRouter();
  const registerUser = () => {
    router.push('registerUser');
    if (!dark) colorMode.toggleColorMode();
    else setWasDark(true);
  };

  return (
    <div className={fader}>
      <div className={styles.container}>
        {!registered &&
          <main className={styles.main}>
            <Pisces className={styles.logo} />
            <br />
            <button className={dark ? `${styles.btn}` : `${styles.btn} ${styles.btnLight}`} onClick={() => {
              setFader(`${styles.fadeIn} ${styles.fadeOut}`);
              setTimeout(registerUser, 600);
            }}>
              New User
            </button>
            <button className={dark ? `${styles.btn}` : `${styles.btn} ${styles.btnLight}`}>
              New Business
            </button>
            <p
              className={`nojs-show ${!session && loading ? styles.loading : styles.loaded
                }`}
            >
              {!session && (
                <>
                  <span className={styles.notSignedInText}>
                    You are not signed in
                  </span>
                  <a
                    href={`/api/auth/signin`}
                    className={styles.buttonPrimary}
                    onClick={(e) => {
                      e.preventDefault();
                      signIn('google');
                    }}
                  >
                    Sign in
                  </a>
                </>
              )}
              {session?.user && (
                <>
                  {session.user.image && (
                    <span
                      style={{ backgroundImage: `url('${session.user.image}')` }}
                      className={styles.avatar}
                    />
                  )}
                  <span className={styles.signedInText}>
                    <small>Signed in as</small>
                    <br />
                    <strong>{session.user.email ?? session.user.name}</strong>
                  </span>
                  <a
                    href={`/api/auth/signout`}
                    className={styles.button}
                    onClick={(e) => {
                      e.preventDefault();
                      signOut('google');
                    }}
                  >
                    Sign out
                  </a>
                </>
              )}
            </p>
            <Box sx={{ display: 'flex', mb: -8, mt: 8, p: 2, width: 180, height: 50, color: 'whitesmoke' }}>
              <Box sx={{ px: 2, pt: 0.4 }}>{dark ? "Light" : "Dark"} Mode</Box>
              <IconButton sx={{ width: 30, height: 30 }} onClick={colorMode.toggleColorMode} color="inherit">
                {dark ? <Brightness7 /> : <Brightness4 />}
              </IconButton>
            </Box>
          </main>
        }
      </div>
    </div>
  )
}
