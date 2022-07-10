import { Brightness4, Brightness7 } from '@mui/icons-material';
import { Box, IconButton } from '@mui/material';
import { signOut } from "next-auth/react";
import * as React from 'react';
import Context from '../contexts/Context';
import styles from '../styles/Home.module.css';

export default function Settings() {
    const { darkMode, colorMode } = React.useContext(Context);
    const handleSignOut = () => signOut({ callbackUrl: 'http://localhost:3000' });
    return (
        <div className={styles.container}>
            <div className={styles.main} style={{ color: 'darkgray' }}>
                <Box sx={{ display: 'flex', m: 0, p: 2, width: 180, height: 50 }}>
                    <Box sx={{ pr: 2, pt: 0.4 }}>{darkMode ? "Light" : "Dark"} Mode</Box>
                    <IconButton sx={{ width: 30, height: 30 }} onClick={colorMode.toggleColorMode} color="inherit">
                        {darkMode ? <Brightness7 /> : <Brightness4 />}
                    </IconButton>
                </Box>
                here will also be chat background image setting
                <button onClick={handleSignOut}>Sign Out</button>
            </div>
        </div>
    )
}






