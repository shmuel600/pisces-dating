import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import StepContent from '@mui/material/StepContent';
import StepLabel from '@mui/material/StepLabel';
import Typography from '@mui/material/Typography';
import * as React from 'react';
import Context from '../../contexts/Context';
import styles from '../../styles/Home.module.css';

export default function LoveLanguages({ handleNext, handleBack }) {
    const { darkMode } = React.useContext(Context);
    return (
        <>
            <StepLabel
            // optional={<Typography variant="caption">Last step</Typography>}
            >
                {`5 Love languages`}
            </StepLabel>
            <StepContent>
                <Typography className={darkMode ? styles.registerTextDark : undefined}>
                    {`Here will be a test to check the 5 love languages of the user, on both recieving/giving ends.`}
                </Typography>
                <Box sx={{ mb: 2 }}>
                    <Box>
                        <Button
                            variant="contained"
                            onClick={handleNext}
                            sx={{ mt: 1, mr: 1 }}
                        >
                            {'Continue'}
                        </Button>
                        <Button
                            onClick={handleBack}
                            sx={{ mt: 1, mr: 1 }}
                        >
                            Back
                        </Button>
                    </Box>
                </Box>
            </StepContent>
        </>
    )
}