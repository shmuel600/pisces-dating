import { Box, Button, Typography } from '@mui/material';

export default function HandleLoveLanguage({ type, state, setState }) {
    return (
        <>
            <Typography sx={{ mt: 2, color: 'text.secondary', fontSize: 16 }}>
                {type === 'need' ? 'How much do you need this from others?' : 'How much do you give this back?'}
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', maxWidth: 300 }}>
                {/* <Typography sx={{ mt: 1, color: 'text.secondary', maxWidth: 300, fontSize: 14 }}>
                    {type}
                </Typography> */}
                <Box sx={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', flexDirection: 'column', maxHeight: 100, minWidth: 280 }}>
                    <Button
                        sx={{ m: 0.5, fontSize: 13 }}
                        variant={state === 1 ? 'contained' : 'outlined'}
                        onClick={() => setState(1)}
                    >
                        I dont
                    </Button>
                    <Button
                        sx={{ m: 0.5, fontSize: 13 }}
                        variant={state === 2 ? 'contained' : 'outlined'}
                        onClick={() => setState(2)}
                    >
                        Barely
                    </Button>
                    <Button
                        sx={{ m: 0.5, fontSize: 13 }}
                        variant={state === 3 ? 'contained' : 'outlined'}
                        onClick={() => setState(3)}
                    >
                        Avarage
                    </Button>
                    <Button
                        sx={{ m: 0.5, fontSize: 13 }}
                        variant={state === 4 ? 'contained' : 'outlined'}
                        onClick={() => setState(4)}
                    >
                        Somewhat
                    </Button>
                    <Button
                        sx={{ m: 0.5, fontSize: 13 }}
                        variant={state === 5 ? 'contained' : 'outlined'}
                        onClick={() => setState(5)}
                    >
                        A lot
                    </Button>
                </Box>
            </Box>
        </>
    )
}