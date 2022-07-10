import { OutlinedInput, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import StepContent from '@mui/material/StepContent';
import StepLabel from '@mui/material/StepLabel';
import * as React from 'react';
import Context from '../../contexts/Context';

export default function GeneralDetails({ handleNext, name, setName, gender, setGender, findMe, setFindMe, setBirthday }) {
    const { darkMode } = React.useContext(Context);
    const [inputDay, setInputDay] = React.useState('');
    const [inputMonth, setInputMonth] = React.useState('');
    const [inputYear, setInputYear] = React.useState('');
    const inputDayRef = React.useRef();
    const inputMonthRef = React.useRef();
    const inputYearRef = React.useRef();
    const validate = () => {
        done();
    }
    const done = () => {
        handleNext();
        const dateOfBirth = new Date('1970-12-30T00:00:00');
        dateOfBirth.setDate(inputDay);
        dateOfBirth.setMonth(inputMonth);
        dateOfBirth.setFullYear(inputYear);
        setBirthday(dateOfBirth);
    }
    return (
        <>
            <StepLabel>{`General details`}</StepLabel>
            <StepContent>
                <Typography style={darkMode ? { color: 'whitesmoke' } : undefined}>
                    First name
                </Typography>
                <Box>
                    <OutlinedInput size='small' placeholder="I am" onChange={(e) => setName(e.target.value)} defaultValue={name} />
                </Box>
                <br />
                <Typography style={darkMode ? { color: 'whitesmoke' } : undefined}>
                    Birthday
                </Typography>
                <Box>
                    <OutlinedInput
                        placeholder="DD"
                        size='small'
                        sx={{ width: 55 }}
                        onChange={(e) => {
                            inputDay.length < 2 && setInputDay(e.target.value);
                            inputDay.length === 1 && inputMonthRef.current.focus();
                        }}
                        onFocus={() => setInputDay('')}
                        value={inputDay}
                        inputRef={inputDayRef}
                    />
                    <span style={{ color: 'darkgray' }}> / </span>
                    <OutlinedInput
                        placeholder="MM"
                        size='small'
                        sx={{ width: 55 }}
                        onChange={(e) => {
                            inputMonth.length < 2 && setInputMonth(e.target.value);
                            inputMonth.length === 1 && inputYearRef.current.focus();
                        }}
                        onKeyDown={(e) => { if (inputMonth.length === 0 && e.key === 'Backspace') inputDayRef.current.focus() }}
                        onFocus={() => setInputMonth('')}
                        value={inputMonth}
                        inputRef={inputMonthRef}
                    />
                    <span style={{ color: 'darkgray' }}> / </span>
                    <OutlinedInput
                        placeholder="YYYY"
                        size='small'
                        sx={{ width: 80 }}
                        onChange={(e) => {
                            inputYear.length < 4 && setInputYear(e.target.value);
                            inputYear.length === 3 && inputYearRef.current.blur();
                        }}
                        onKeyDown={(e) => { if (inputYear.length === 0 && e.key === 'Backspace') inputMonthRef.current.focus() }}
                        onFocus={() => setInputYear('')}
                        value={inputYear}
                        inputRef={inputYearRef}
                    />
                </Box>
                <br />
                <Typography style={darkMode ? { color: 'whitesmoke' } : undefined}>
                    Gender
                </Typography>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Button
                        sx={{ backgroundColor: 'transparent', color: '#1976d2', boxShadow: 'none' }}
                        variant={gender === 'Man' ? 'outlined' : 'contained'}
                        onClick={() => setGender('Man')}
                    >
                        Man
                    </Button>
                    <Button
                        sx={{ backgroundColor: 'transparent', color: '#1976d2', boxShadow: 'none' }}
                        variant={gender === 'Woman' ? 'outlined' : 'contained'}
                        onClick={() => setGender('Woman')}
                    >
                        Woman
                    </Button>
                    <Button
                        sx={{ backgroundColor: 'transparent', color: '#1976d2', boxShadow: 'none' }}
                        variant={gender === 'More' ? 'outlined' : 'contained'}
                        onClick={() => setGender('More')}
                    >
                        More
                    </Button>
                </Box>
                <br />
                <Typography style={darkMode ? { color: 'whitesmoke' } : undefined}>
                    Find me
                </Typography>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Button
                        sx={{ backgroundColor: 'transparent', color: '#1976d2', boxShadow: 'none' }}
                        variant={findMe === 'Men' ? 'outlined' : 'contained'}
                        onClick={() => setFindMe('Men')}
                    >
                        Men
                    </Button>
                    <Button
                        sx={{ backgroundColor: 'transparent', color: '#1976d2', boxShadow: 'none' }}
                        variant={findMe === 'Women' ? 'outlined' : 'contained'}
                        onClick={() => setFindMe('Women')}
                    >
                        Women
                    </Button>
                    <Button
                        sx={{ backgroundColor: 'transparent', color: '#1976d2', boxShadow: 'none' }}
                        variant={findMe === 'Everyone' ? 'outlined' : 'contained'}
                        onClick={() => setFindMe('Everyone')}
                    >
                        Everyone
                    </Button>
                </Box>
                <br />
                {/* {validation messages here} */}
                <Box sx={{ my: 2 }}>
                    <Box>
                        <Button
                            variant="contained"
                            onClick={validate}
                            sx={{ mt: 1, mr: 1 }}
                        >
                            {'Continue'}
                        </Button>
                    </Box>
                </Box>
            </StepContent>
        </>
    )
}