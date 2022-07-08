import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Step from '@mui/material/Step';
import StepContent from '@mui/material/StepContent';
import StepLabel from '@mui/material/StepLabel';
import Stepper from '@mui/material/Stepper';
import Typography from '@mui/material/Typography';
import * as React from 'react';
import styles from '../styles/Home.module.css';
import { useRouter } from 'next/router';

const steps = [
    {
        label: 'General details',
        description:
            `Here will be: name, gender, date of birth (age), 
            location (request location), prefarances, maybe more stuff like height.`,
    },
    {
        label: '5 love languages',
        description:
            `Here will be a test to check the 5 love languages of the user, on both recieving/giving ends.`,
    },
    {
        label: '16 personalities',
        description:
            `Here will be a link to the 16 personalities test (myers-briggs type indicator / MBTI).`,
    },
];

export default function RegisterUser() {
    const [activeStep, setActiveStep] = React.useState(0);
    const router = useRouter();
    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };
    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };
    const getAge = (dateOfBirth) => {
        const yearDifference = new Date().getUTCFullYear() - new Date(dateOfBirth).getUTCFullYear();
        const currentDate = new Date().getMonth() * 100 + new Date().getDate();
        const birthDate = new Date(dateOfBirth).getMonth() * 100 + new Date(dateOfBirth).getDate();
        const birthdayPassed = currentDate < birthDate ? false : true;
        const age = birthdayPassed ? yearDifference : yearDifference - 1;
        return age;
    }
    const createProfile = async () => {
        const dateOfBirth = new Date('1970-12-30T00:00:00');
        dateOfBirth.setDate(18);
        dateOfBirth.setMonth(6);
        dateOfBirth.setFullYear(1984);
        const age = getAge(dateOfBirth);
        const user =
        {
            name: "User Name",
            gender: "male",
            age,
            dateOfBirth,
            email: "mail@adress.com",
            password: "password123",
            personalityType: "infj",
            loveLanguage: {
                giving: {
                    words: { title: 'Words', value: 2 },
                    acts: { title: 'Acts', value: 5 },
                    touch: { title: 'Touch', value: 4 },
                    time: { title: 'Time', value: 5 },
                    gifts: { title: 'Gifts', value: 1 }
                },
                recieving: {
                    words: { title: 'Words', value: 2 },
                    acts: { title: 'Acts', value: 3 },
                    touch: { title: 'Touch', value: 1 },
                    time: { title: 'Time', value: 4 },
                    gifts: { title: 'Gifts', value: 3 }
                }
            },
        };
        // fetch("/api/user", {
        //     method: 'POST',
        //     headers: { 'Content-Type': 'application/json' },
        //     body: JSON.stringify(user)
        // });
        router.push('loadUser');
    };
    return (
        <Box className={styles.container}>
            <Box className={styles.main}>
                <Box sx={{ mx: 20, minWidth: 300, maxWidth: 500 }}>
                    <Stepper activeStep={activeStep} orientation="vertical">
                        {steps.map((step, index) => (
                            <Step key={step.label}>
                                <StepLabel
                                    optional={
                                        index === 2 ? (
                                            <Typography variant="caption">Last step</Typography>
                                        ) : null
                                    }
                                >
                                    {step.label}
                                </StepLabel>
                                <StepContent>
                                    <Typography color={'whitesmoke'}>{step.description}</Typography>
                                    <Box sx={{ mb: 2 }}>
                                        <Box>
                                            <Button
                                                variant="contained"
                                                onClick={handleNext}
                                                sx={{ mt: 1, mr: 1 }}
                                            >
                                                {index === steps.length - 1 ? 'Finish' : 'Continue'}
                                            </Button>
                                            <Button
                                                disabled={index === 0}
                                                onClick={handleBack}
                                                sx={{ mt: 1, mr: 1 }}
                                            >
                                                Back
                                            </Button>
                                        </Box>
                                    </Box>
                                </StepContent>
                            </Step>
                        ))}
                    </Stepper>
                    {activeStep === steps.length && (
                        <Button
                            variant="contained"
                            onClick={createProfile}
                            sx={{ mt: 1, mr: 1 }}
                        >
                            Create Profile
                        </Button>
                    )}
                </Box>
            </Box>
        </Box>
    );
}
