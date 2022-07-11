import { Brightness4, Brightness7 } from '@mui/icons-material';
import { Box, IconButton } from '@mui/material';
import { useRouter } from 'next/router';
import { signIn, useSession } from "next-auth/react";
import * as React from 'react';
import Pisces from '../components/Pisces';
import Context from '../contexts/Context';
import styles from '../styles/Home.module.css';

export default function Home() {
  const { data: session, status } = useSession();
  const loading = status === "loading";
  const router = useRouter();
  const { darkMode, colorMode } = React.useContext(Context);
  const userExists = () => {
    router.replace('loadUser');
  }
  const newUser = (type) => {
    // setUserType(type);
    // signIn('google');
    userExists();
  }
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        {session?.user && userExists()}
        {!session &&
          <>
            <Pisces className={styles.logo} />
            <br />
            <button className={darkMode ? `${styles.btn}` : `${styles.btn} ${styles.btnLight}`} onClick={() => {
              newUser('user')
            }}>
              New User
            </button>
            <button className={darkMode ? `${styles.btn}` : `${styles.btn} ${styles.btnLight}`}>
              New Business
            </button>
            <Box sx={{ display: 'flex', mb: -8, mt: 8, p: 2, width: 180, height: 50, color: 'whitesmoke' }}>
              <Box sx={{ px: 2, pt: 0.4 }}>{darkMode ? "Light" : "Dark"} Mode</Box>
              <IconButton sx={{ width: 30, height: 30 }} onClick={colorMode.toggleColorMode} color="inherit">
                {darkMode ? <Brightness7 /> : <Brightness4 />}
              </IconButton>
            </Box>
          </>
        }
      </main>
    </div>
  )
}
