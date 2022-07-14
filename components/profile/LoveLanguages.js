import {
    EditRounded as Edit, InterestsRounded as LoveLanguageRecieve,
    QuizRounded as RetakeTest, VolunteerActivismRounded as LoveLanguageGive
} from '@mui/icons-material';
import { Box, IconButton, Slider, Step, Stepper } from '@mui/material';
import * as React from 'react';
import Context from '../../contexts/Context';
import styles from '../../styles/Home.module.css';
import LoveLanguagesTest from '../registerUser/LoveLanguages';

export default function LoveLanguages() {
    const { user } = React.useContext(Context);
    const [retakeTest, setRetakeTest] = React.useState(false);
    const [loveLanguage, setLoveLanguage] = React.useState(user.loveLanguage);
    const updateLoveLanguage = (newLL) => {
        console.log(newLL, "updated");
        fetch(`/api/user/${user._id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ loveLanguage: newLL })
        });
        setLoveLanguage(newLL);
    }
    return (
        <>
            <Box sx={{ display: 'flex' }}>
                <Box sx={{ left: 0, display: 'flex', flexDirection: 'column', mt: -1, mx: 2 }}>
                    <label>My Love Languages</label>
                </Box>
                {!retakeTest &&
                    < IconButton sx={{ ml: 5.5, mr: -10.5, mt: -1, mb: -1 }} onClick={() => setRetakeTest(true)}>
                        <Edit color="primary" />
                    </IconButton>
                }
            </Box>
            {
                !retakeTest ?
                    <Box>
                        <Box sx={{ display: 'flex' }}>
                            <Box sx={{ position: 'absolute', left: 0, display: 'flex', flexDirection: 'column', mt: -1, fontSize: 16, mx: 1.5 }}>
                                <label>Give</label>
                                <LoveLanguageGive sx={{ color: 'darkgray', width: 30, height: 30, mx: 0.5, mt: -6.5 }} />
                            </Box>
                            <Box sx={{ height: 140, mt: 4, ml: 2 }}>
                                {Object.keys(loveLanguage.giving).map((key, index) =>
                                    <Box key={key} sx={{ display: 'flex', justifyContent: 'space-around', width: 300, m: -1.5 }}>
                                        <Box sx={{ width: 30, mt: 0.5 }}>
                                            <label>{loveLanguage.giving[key].title}</label>
                                        </Box>
                                        <Slider
                                            sx={{ mt: -0.5, mr: -2, width: 140 }}
                                            min={1}
                                            max={5}
                                            size="medium"
                                            value={loveLanguage.giving[key].value}
                                            aria-label="Small"
                                            valueLabelDisplay="auto"
                                        />
                                        <label>{loveLanguage.giving[key].value}/5</label>
                                    </Box>
                                )}
                            </Box>
                        </Box>
                        <br />
                        <Box sx={{ display: 'flex' }}>
                            <Box sx={{ position: 'absolute', left: 0, display: 'flex', flexDirection: 'column', mt: -1, fontSize: 16, mx: 1 }}>
                                <label>Recieve</label>
                                <LoveLanguageRecieve sx={{ color: 'darkgray', width: 30, height: 30, mx: 1, mt: -6.5 }} />
                            </Box>
                            <Box sx={{ height: 140, mt: 4, ml: 2 }}>
                                {Object.keys(loveLanguage.recieving).map((key, index) =>
                                    <Box key={key} sx={{ display: 'flex', justifyContent: 'space-around', width: 300, m: -1.5 }} className={styles.getSmaller}>
                                        <Box sx={{ width: 30, mt: 0.5 }}>
                                            <label>{loveLanguage.giving[key].title}</label>
                                        </Box>
                                        <Slider
                                            sx={{ mt: -0.5, mr: -2, width: 140 }}
                                            min={1}
                                            max={5}
                                            size="medium"
                                            value={loveLanguage.recieving[key].value}
                                            aria-label="Small"
                                            valueLabelDisplay="auto"
                                        />
                                        <label>{loveLanguage.recieving[key].value}/5</label>
                                    </Box>
                                )}
                            </Box>
                        </Box>
                    </Box>
                    :
                    <Box>
                        <Box sx={{ position: 'absolute', left: 0, display: 'flex', flexDirection: 'column', mt: 3.5, fontSize: 16, mx: 1.5 }} >
                            <RetakeTest sx={{ color: 'darkgray', width: 30, height: 30, mx: 0.5, mt: -6.5 }} />
                        </Box>
                        <Stepper nonLinear activeStep={0} orientation="vertical">
                            <Step sx={{ mt: -1, ml: -3.5, transform: 'scale(0.97)' }}>
                                <LoveLanguagesTest
                                    handleNext={() => setRetakeTest(false)}
                                    handleBack={() => setRetakeTest(false)}
                                    setLoveLanguage={updateLoveLanguage}
                                    isRetake={true}
                                />
                            </Step>
                        </Stepper>
                    </Box>
            }
        </>
    )
}