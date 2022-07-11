import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Accordion, AccordionDetails, AccordionSummary, Box, Button, Fab, StepContent, StepLabel, Typography } from '@mui/material';
import {
    RoomServiceOutlined as Acts,
    CardGiftcardOutlined as Gifts,
    AccessTimeOutlined as Time,
    ChatOutlined as Words,
    PanToolOutlined as Touch
} from '@mui/icons-material';
import * as React from 'react';
import Context from '../../contexts/Context';
import HandleLoveLanguage from './LoveLanguages/HandleLoveLanguage';

export default function LoveLanguages({ handleNext, handleBack, setLoveLanguage }) {
    const { darkMode } = React.useContext(Context);
    const [givingActs, setGivingActs] = React.useState(0);
    const [recievingActs, setRecievingActs] = React.useState(0);
    const [givingGifts, setGivingGifts] = React.useState(0);
    const [recievingGifts, setRecievingGifts] = React.useState(0);
    const [givingTime, setGivingTime] = React.useState(0);
    const [recievingTime, setRecievingTime] = React.useState(0);
    const [givingWords, setGivingWords] = React.useState(0);
    const [recievingWords, setRecievingWords] = React.useState(0);
    const [givingTouch, setGivingTouch] = React.useState(0);
    const [recievingTouch, setRecievingTouch] = React.useState(0);
    const [expanded, setExpanded] = React.useState(false);
    const give = 'give';
    const recieve = 'need';
    const handleChange = (panel) =>
        (event, isExpanded) => {
            setExpanded(isExpanded ? panel : false);
        };
    const handleDone = () => {
        handleNext();
        const loveLanguages = {
            giving: {
                words: {
                    title: 'Words',
                    value: givingWords
                },
                acts: {
                    title: 'Acts',
                    value: givingActs
                },
                touch: {
                    title: 'Touch',
                    value: givingTouch
                },
                time: {
                    title: 'Time',
                    value: givingTime
                },
                gifts: {
                    title: 'Gifts',
                    value: givingGifts
                }
            },
            recieving: {
                words: {
                    title: 'Words',
                    value: recievingWords
                },
                acts: {
                    title: 'Acts',
                    value: recievingActs
                },
                touch: {
                    title: 'Touch',
                    value: recievingTouch
                },
                time: {
                    title: 'Time',
                    value: recievingTime
                },
                gifts: {
                    title: 'Gifts',
                    value: recievingGifts
                }
            }
        }
        setLoveLanguage(loveLanguages);
    }
    return (
        <>
            <StepLabel
            // optional={<Typography variant="caption">Last step</Typography>}
            >
                {`5 Love languages`}
            </StepLabel>
            <StepContent>
                <Typography style={darkMode ? { color: 'whitesmoke' } : undefined}>
                    What are the 5 Love Languages?
                </Typography>
                <Typography sx={{ color: 'text.secondary', my: 1 }}>
                    {`Different people with different personalities give and receive love in different ways.`}
                    <br />
                    {`By learning to recognize these preferences in yourself and in your loved ones, 
                    you can connect more profoundly, and truly grow closer.`}
                </Typography>
                <Box sx={{ my: 4, minWidth: 280 }}>
                    <Accordion expanded={expanded === 'acts'} onChange={handleChange('acts')}>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="acts-content"
                            id="acts-header"
                        >
                            <Typography sx={{ flexShrink: 0 }} >
                                <Fab size='small' sx={{ mr: 2, color: 'whitesmoke', backgroundColor: '#3495dd' }}>
                                    <Acts />
                                </Fab>
                                Acts of Service
                            </Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Box sx={{ backgroundColor: 'rgba(130, 130, 130, 0.1)', m: -0.5, p: 2, borderRadius: 5 }}>
                                <Typography sx={{ mb: 1, color: 'text.secondary' }}>
                                    {`Actions speak louder than words`}
                                </Typography>
                                <Typography sx={{ fontSize: 'small' }}>
                                    Anything you do to ease the burden of responsibilities weighing on an another.
                                    <br />
                                    Indifference, broken commitments, and making more work for them tell speakers of this language their feelings dont matter.
                                </Typography>
                            </Box>
                            <br />
                            <HandleLoveLanguage type={recieve} state={recievingActs} setState={setRecievingActs} />
                            <HandleLoveLanguage type={give} state={givingActs} setState={setGivingActs} />
                        </AccordionDetails>
                    </Accordion>
                    <Accordion expanded={expanded === 'gifts'} onChange={handleChange('gifts')}>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="gifts-content"
                            id="gifts-header"
                        >
                            <Typography sx={{ flexShrink: 0 }} >
                                <Fab size='small' sx={{ mr: 2, color: 'whitesmoke', backgroundColor: '#f54449' }}>
                                    <Gifts />
                                </Fab>
                                Receiving Gifts
                            </Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Box sx={{ backgroundColor: 'rgba(130, 130, 130, 0.1)', m: -0.5, p: 2, borderRadius: 5 }}>
                                <Typography sx={{ mb: 1, color: 'text.secondary' }}>
                                    {`They thought about you when they chose this gift`}
                                </Typography>
                                <Typography sx={{ fontSize: 'small' }}>
                                    The receiver of gifts thrives on the love, thoughtfulness, and effort behind the gift.
                                    <br />
                                    The gift show them they are known, cared for and prized.
                                    <br />
                                    A missed birthday, anniversary, or a hasty, thoughtless gift would be disastrous.
                                </Typography>
                            </Box>
                            <br />
                            <HandleLoveLanguage type={recieve} state={recievingGifts} setState={setRecievingGifts} />
                            <HandleLoveLanguage type={give} state={givingGifts} setState={setGivingGifts} />
                        </AccordionDetails>
                    </Accordion>
                    <Accordion expanded={expanded === 'time'} onChange={handleChange('time')}>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="time-content"
                            id="time-header"
                        >
                            <Typography sx={{ flexShrink: 0 }} >
                                <Fab size='small' sx={{ mr: 2, color: 'whitesmoke', backgroundColor: '#ffc145' }}>
                                    <Time />
                                </Fab>
                                Quality Time
                            </Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Box sx={{ backgroundColor: 'rgba(130, 130, 130, 0.1)', m: -0.5, p: 2, borderRadius: 5 }}>
                                <Typography sx={{ mb: 1, color: 'text.secondary' }}>
                                    {`Giving the other person your undivided attention`}
                                </Typography>
                                <Typography sx={{ fontSize: 'small' }}>
                                    Being there for this type of person is critical, but really being there –
                                    with the TV off, phone down, and everything else on standby.
                                    <br />
                                    Focusing only on them makes them feel truly special and loved.
                                    <br />
                                    Distractions, postponed dates, or the failure to listen can be especially hurtful.
                                </Typography>
                            </Box>
                            <br />
                            <HandleLoveLanguage type={recieve} state={recievingTime} setState={setRecievingTime} />
                            <HandleLoveLanguage type={give} state={givingTime} setState={setGivingTime} />
                        </AccordionDetails>
                    </Accordion>
                    <Accordion expanded={expanded === 'words'} onChange={handleChange('words')}>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="words-content"
                            id="words-header"
                        >
                            <Typography sx={{ flexShrink: 0 }} >
                                <Fab size='small' sx={{ mr: 2, color: 'whitesmoke', backgroundColor: '#28c74d' }}>
                                    <Words />
                                </Fab>
                                Words of Affirmation
                            </Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Box sx={{ backgroundColor: 'rgba(130, 130, 130, 0.1)', m: -0.5, p: 2, borderRadius: 5 }}>
                                <Typography sx={{ mb: 1, color: 'text.secondary' }}>
                                    {`Sometimes you need to hear it`}
                                </Typography>
                                <Typography sx={{ fontSize: 'small' }}>
                                    Hearing the words, "I love you", and the reasons behind that love sends their spirits skyward.
                                    <br />
                                    Unsolicited compliments mean the world to them.
                                    <br />
                                    Kind, encouraging, and positive words are truly life-giving.
                                    <br />
                                    Insults can leave them shattered and are not easily forgotten.
                                </Typography>
                            </Box>
                            <br />
                            <HandleLoveLanguage type={recieve} state={recievingWords} setState={setRecievingWords} />
                            <HandleLoveLanguage type={give} state={givingWords} setState={setGivingWords} />
                        </AccordionDetails>
                    </Accordion>
                    <Accordion expanded={expanded === 'touch'} onChange={handleChange('touch')}>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="touch-content"
                            id="touch-header"
                        >
                            <Typography sx={{ flexShrink: 0 }} >
                                <Fab size='small' sx={{ mr: 2, color: 'whitesmoke', backgroundColor: '#f78632' }}>
                                    <Touch />
                                </Fab>
                                Physical Touch
                            </Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Box sx={{ backgroundColor: 'rgba(130, 130, 130, 0.1)', m: -0.5, p: 2, borderRadius: 5 }}>
                                <Typography sx={{ mb: 1, color: 'text.secondary' }}>
                                    {`There's nothing more intimate than a good cuddle`}
                                </Typography>
                                <Typography sx={{ fontSize: 'small' }}>
                                    Hugs, pats on the back, holding hands, and thoughtful touches on the arm, shoulder, or face – they can all be ways to show excitement, concern, care, and love.
                                    <br />
                                    Physical presence and accessibility are crucial, while neglect or abuse can be unforgivable and destructive.
                                </Typography>
                            </Box>
                            <br />
                            <HandleLoveLanguage type={recieve} state={recievingTouch} setState={setRecievingTouch} />
                            <HandleLoveLanguage type={give} state={givingTouch} setState={setGivingTouch} />
                        </AccordionDetails>
                    </Accordion>
                </Box>
                {/* {validation messages here} */}
                <Box sx={{ my: 2 }}>
                    <Box>
                        <Button
                            variant="contained"
                            onClick={handleDone}
                            disabled={
                                (
                                    givingActs === 0 ||
                                    recievingActs === 0 ||
                                    givingGifts === 0 ||
                                    recievingGifts === 0 ||
                                    givingTime === 0 ||
                                    recievingTime === 0 ||
                                    givingWords === 0 ||
                                    recievingWords === 0 ||
                                    givingTouch === 0 ||
                                    recievingTouch === 0
                                )
                            }
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