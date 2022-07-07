import { Brightness4, Brightness7 } from '@mui/icons-material';
import { Box, IconButton } from '@mui/material';
import * as React from 'react';
import Context from '../contexts/Context';
import styles from '../styles/Home.module.css';

export default function Settings() {
    const { dark, colorMode } = React.useContext(Context);
    return (
        <div className={styles.container}>
            <div className={styles.main} style={{ color: 'darkgray' }}>
                <Box sx={{ display: 'flex', m: 0, p: 2, width: 180, height: 50 }}>
                    <Box sx={{ pr: 2, pt: 0.4 }}>{dark ? "Dark" : "Light"} Mode</Box>
                    <IconButton sx={{ width: 30, height: 30 }} onClick={colorMode.toggleColorMode} color="inherit">
                        {dark ? <Brightness7 /> : <Brightness4 />}
                    </IconButton>
                </Box>
                here will also be chat background image setting
            </div>
        </div>
    )
}






