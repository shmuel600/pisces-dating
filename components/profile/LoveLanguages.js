import LoveLanguageRecieve from '@mui/icons-material/InterestsRounded';
import LoveLanguageGive from '@mui/icons-material/VolunteerActivismRounded';
import { Box, Slider } from '@mui/material';
import * as React from 'react';
import styles from '../../styles/Home.module.css';
import Context from '../../contexts/Context';

export default function LoveLanguages() {
    const { user } = React.useContext(Context);
    return (
        <>
            <Box sx={{ display: 'flex' }}>
                <Box sx={{ left: 0, display: 'flex', flexDirection: 'column', mt: -1, mx: 2 }}>
                    <label>My Love Languages</label>
                </Box>
            </Box>
            <Box sx={{ display: 'flex' }}>
                <Box sx={{ position: 'absolute', left: 0, display: 'flex', flexDirection: 'column', mt: -1, fontSize: 16, mx: 1.5 }}>
                    <label>Give</label>
                    <LoveLanguageGive sx={{ color: 'gray', width: 30, height: 30, mx: 0.5, mt: -6.5 }} />
                </Box>
                <Box sx={{ height: 140, mt: 4, ml: 2 }}>
                    {Object.keys(user.loveLanguage.giving).map((key, index) =>
                        <Box key={key} sx={{ display: 'flex', justifyContent: 'space-around', width: 300, m: -1.5 }}>
                            <Box sx={{ width: 30, mt: 0.5 }}>
                                <label>{user.loveLanguage.giving[key].title}</label>
                            </Box>
                            <Slider
                                sx={{ mt: -0.5, mr: -2, width: 140 }}
                                min={1}
                                max={5}
                                size="medium"
                                value={user.loveLanguage.giving[key].value}
                                aria-label="Small"
                                valueLabelDisplay="auto"
                            />
                            <label>{user.loveLanguage.giving[key].value}/5</label>
                        </Box>
                    )}
                </Box>
            </Box>
            <br />
            <Box sx={{ display: 'flex' }}>
                <Box sx={{ position: 'absolute', left: 0, display: 'flex', flexDirection: 'column', mt: -1, fontSize: 16, mx: 1 }}>
                    <label>Recieve</label>
                    <LoveLanguageRecieve sx={{ color: 'gray', width: 30, height: 30, mx: 1, mt: -6.5 }} />
                </Box>
                <Box sx={{ height: 140, mt: 4, ml: 2 }}>
                    {Object.keys(user.loveLanguage.recieving).map((key, index) =>
                        <Box key={key} sx={{ display: 'flex', justifyContent: 'space-around', width: 300, m: -1.5 }} className={styles.getSmaller}>
                            <Box sx={{ width: 30, mt: 0.5 }}>
                                <label>{user.loveLanguage.giving[key].title}</label>
                            </Box>
                            <Slider
                                sx={{ mt: -0.5, mr: -2, width: 140 }}
                                min={1}
                                max={5}
                                size="medium"
                                value={user.loveLanguage.recieving[key].value}
                                aria-label="Small"
                                valueLabelDisplay="auto"
                            />
                            <label>{user.loveLanguage.recieving[key].value}/5</label>
                        </Box>
                    )}
                </Box>
            </Box>
        </>
    )
}