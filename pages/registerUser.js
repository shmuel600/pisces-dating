import { Box, Button, Stepper, Step, StepLabel, Typography, StepContent } from '@mui/material';
import { useSession } from "next-auth/react";
import { useRouter } from 'next/router';
import * as React from 'react';
import GeneralDetails from '../components/registerUser/GeneralDetails';
import LoveLanguages from '../components/registerUser/LoveLanguages';
import Personalities from '../components/registerUser/Personalities';
import Context from '../contexts/Context';
import styles from '../styles/Home.module.css';

export default function RegisterUser() {
    const router = useRouter();
    const { data: session } = useSession();
    const { darkMode } = React.useContext(Context);
    const [activeStep, setActiveStep] = React.useState(0);
    const [name, setName] = React.useState('');
    const [gender, setGender] = React.useState('');
    const [findMeGender, setFindMeGender] = React.useState('');
    const [birthday, setBirthday] = React.useState(new Date);
    const [personalityType, setPersonalityType] = React.useState('pnlt');
    const [loveLanguage, setLoveLanguage] = React.useState({
        giving: {
            words: { title: 'Words', value: 3 },
            acts: { title: 'Acts', value: 3 },
            touch: { title: 'Touch', value: 3 },
            time: { title: 'Time', value: 3 },
            gifts: { title: 'Gifts', value: 3 }
        },
        recieving: {
            words: { title: 'Words', value: 3 },
            acts: { title: 'Acts', value: 3 },
            touch: { title: 'Touch', value: 3 },
            time: { title: 'Time', value: 3 },
            gifts: { title: 'Gifts', value: 3 }
        }
    });
    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };
    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };
    const getAge = (birthDay) => {
        const yearDifference = new Date().getUTCFullYear() - new Date(birthDay).getUTCFullYear();
        const currentDate = new Date().getMonth() * 100 + new Date().getDate();
        const birthDate = new Date(birthDay).getMonth() * 100 + new Date(birthDay).getDate();
        const birthdayPassed = currentDate < birthDate ? false : true;
        const age = birthdayPassed ? yearDifference : yearDifference - 1;
        return age;
    };
    const createProfile = async () => {
        const chatBackground = "https://res.cloudinary.com/pisces/image/upload/v1657797207/chatDefault.png";
        const profileImage = "https://res.cloudinary.com/pisces/image/upload/v1657804688/profileDefault.png";
        const user = {
            _id: session.user.email,
            name,
            gender,
            findMe: {
                gender: findMeGender,
                age: [(getAge(birthday) - 4) > 18 ? (getAge(birthday) - 4) : 18, getAge(birthday) + 4]
            },
            birthday,
            // darkMode,
            personalityType,
            loveLanguage,
            profileImage,
            chatBackground
        };
        await fetch("/api/user", {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(user)
        });
        router.replace('loadUser');
    };

    return (
        <Box className={styles.container} sx={darkMode ? { backgroundColor: 'rgb(14, 19, 20)' } : { backgroundColor: 'whitesmoke' }}>
            <Box className={styles.main}>
                <Box sx={{ mx: 20, minWidth: 300, maxWidth: 500 }}>
                    <Stepper activeStep={activeStep} orientation="vertical">
                        <Step>
                            <GeneralDetails handleNext={handleNext}
                                name={name} gender={gender} findMe={findMeGender} birthday={birthday}
                                setName={setName} setGender={setGender} setFindMe={setFindMeGender} setBirthday={setBirthday}
                            />
                        </Step>
                        <Step>
                            <LoveLanguages handleNext={handleNext} handleBack={handleBack}
                                setLoveLanguage={setLoveLanguage}
                            />
                        </Step>
                        <Step>
                            {/* <Personalities handleNext={handleNext} handleBack={handleBack}
                            /> */}
                            <StepLabel
                                optional={<Typography variant="caption">Last step</Typography>}
                            >
                                {`Create Profile`}
                            </StepLabel>
                            <StepContent>
                                <Button
                                    variant="contained"
                                    onClick={createProfile}
                                    sx={{ mt: 1, mr: 1 }}
                                >
                                    Create Profile
                                </Button>
                            </StepContent>
                        </Step>
                    </Stepper>
                    {/* {activeStep === 3 && (   
                    )} */}
                </Box>
            </Box>
        </Box>
    );
}
