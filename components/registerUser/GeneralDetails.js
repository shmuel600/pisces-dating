import { OutlinedInput, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import StepContent from '@mui/material/StepContent';
import StepLabel from '@mui/material/StepLabel';
import * as React from 'react';
import Context from '../../contexts/Context';

export default function GeneralDetails({ handleNext, name, setName, gender, setGender, findMe, setFindMe, setBirthday }) {
    const { darkMode } = React.useContext(Context);
    const [checkName, setCheckName] = React.useState(true);
    const [checkAge, setCheckAge] = React.useState(true);
    const [checkAdult, setCheckAdult] = React.useState(true);
    const [inputDay, setInputDay] = React.useState('');
    const [inputMonth, setInputMonth] = React.useState('');
    const [inputYear, setInputYear] = React.useState('');
    const inputDayRef = React.useRef();
    const inputMonthRef = React.useRef();
    const inputYearRef = React.useRef();
    const handleCheckAge = () => {
        setCheckAge(
            inputDay.length === 2 && inputDay > 0 && inputDay <= 31 &&
            inputMonth.length === 2 && inputMonth > 0 && inputMonth <= 12 &&
            inputYear.length > 3 && inputYear <= (new Date).getFullYear()
        )
        checkAge && setCheckAdult(
            inputYear.length > 3 && inputYear <= (new Date).getFullYear() - 16
        )
    }
    const handleDone = () => {
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
                    <OutlinedInput size='small' placeholder="I am" onChange={(e) => setName(e.target.value)} defaultValue={name}
                        onBlur={() => setCheckName(name.length >= 2)}
                    />
                    {!checkName && <Typography sx={{ color: '#d74545', fontSize: 12 }}>{'Name should have at least 2 characters'}</Typography>}
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
                            inputYear.length === 4 && inputYearRef.current.blur();
                        }}
                        onKeyDown={(e) => { if (inputYear.length === 0 && e.key === 'Backspace') inputMonthRef.current.focus() }}
                        onFocus={() => setInputYear('')}
                        onBlur={handleCheckAge}
                        value={inputYear}
                        inputRef={inputYearRef}
                    />
                </Box>
                {!checkAge && <Typography sx={{ color: '#d74545', fontSize: 12 }}>{'Please enter a correct date'}</Typography>}
                {!checkAdult && <Typography sx={{ color: '#d74545', fontSize: 12 }}>{'Must be at least 16 to sign up'}</Typography>}
                <br />
                <Typography style={darkMode ? { color: 'whitesmoke' } : undefined}>
                    Gender
                </Typography>
                <Box sx={{ display: 'flex', justifyContent: 'flex-start' }}>
                    <Button
                        // sx={{ backgroundColor: 'transparent', color: '#1976d2', boxShadow: 'none' }}
                        sx={{ mr: 0.5 }}
                        variant={gender === 'Man' ? 'contained' : 'outlined'}
                        onClick={() => setGender('Man')}
                    >
                        Man
                    </Button>
                    <Button
                        // sx={{ backgroundColor: 'transparent', color: '#1976d2', boxShadow: 'none' }}
                        sx={{ mr: 0.5 }}
                        variant={gender === 'Woman' ? 'contained' : 'outlined'}
                        onClick={() => setGender('Woman')}
                    >
                        Woman
                    </Button>
                    <Button
                        // sx={{ backgroundColor: 'transparent', color: '#1976d2', boxShadow: 'none' }}
                        sx={{ mr: 0.5 }}
                        variant={gender === 'Other' ? 'contained' : 'outlined'}
                        onClick={() => setGender('Other')}
                    >
                        Other
                    </Button>
                </Box>
                <br />
                <Typography style={darkMode ? { color: 'whitesmoke' } : undefined}>
                    Find me
                </Typography>
                <Box sx={{ display: 'flex', justifyContent: 'flex-start' }}>
                    <Button
                        // sx={{ backgroundColor: 'transparent', color: '#1976d2', boxShadow: 'none' }}
                        sx={{ mr: 0.5 }}
                        variant={findMe === 'Men' ? 'contained' : 'outlined'}
                        onClick={() => setFindMe('Men')}
                    >
                        Men
                    </Button>
                    <Button
                        // sx={{ backgroundColor: 'transparent', color: '#1976d2', boxShadow: 'none' }}
                        sx={{ mr: 0.5 }}
                        variant={findMe === 'Women' ? 'contained' : 'outlined'}
                        onClick={() => setFindMe('Women')}
                    >
                        Women
                    </Button>
                    <Button
                        // sx={{ backgroundColor: 'transparent', color: '#1976d2', boxShadow: 'none' }}
                        sx={{ mr: 0.5 }}
                        variant={findMe === 'Everyone' ? 'contained' : 'outlined'}
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
                            onClick={handleDone}
                            disabled={!(checkName && checkAge &&
                                gender.length > 0 && findMe.length > 0 && name.length >= 2 &&
                                inputDay.length === 2 && inputDay > 0 && inputDay <= 31 &&
                                inputMonth.length === 2 && inputMonth > 0 && inputMonth <= 12 &&
                                inputYear.length > 3 && inputYear <= ((new Date).getFullYear() - 16)
                            )}
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