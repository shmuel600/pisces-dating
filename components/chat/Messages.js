import { Paper, TextareaAutosize } from '@mui/material';
import DoneIcon from '@mui/icons-material/Done';
import DoneAllIcon from '@mui/icons-material/DoneAll';
// import MessageSound from '../../public/water-drop-sound-effect.mp3';

export default function Messages({ user, messages, currentHeight, isMobile, messagesPageBottom }) {

    return (
        <Paper
            sx={{ background: 'transparent', boxShadow: 'none', overflowY: 'auto', overflowX: 'hidden' }}
            style={{ width: '98%', height: `${currentHeight * (isMobile ? '0.68' : '0.78')}px`, top: '11%', position: 'absolute' }}
        >
            {messages.map((message, index) =>
                <div key={index} style={{ display: 'flex', flexDirection: 'column' }}>
                    {message.senderId &&
                        <div
                            style={
                                message.senderId === user._id ?
                                    {
                                        height: 'fit-content',
                                        // minHeight: '50',
                                        // maxWidth: `${isMobile ? '80%' : '100%'}`,
                                        // width: '80px',
                                        padding: 8,
                                        margin: 5,
                                        marginLeft: '2%',
                                        marginBottom: 10,
                                        background: `rgb(25, 118, 210)`,
                                        // background: `${darkMode ? '#329cbc' : 'rgb(25, 118, 210)'}`,
                                        color: 'white',
                                        borderRadius: 15,
                                        alignSelf: 'flex-start'
                                    }
                                    :
                                    {
                                        height: 'fit-content',
                                        // minHeight: '50',
                                        // maxWidth: '90%',
                                        width: 'inherit',
                                        padding: 8,
                                        margin: 5,
                                        marginRight: '2%',
                                        marginBottom: 10,
                                        background: 'rgb(40,40,40)',
                                        color: 'white',
                                        borderRadius: 15,
                                        alignSelf: 'flex-end'
                                    }
                            }>
                            <TextareaAutosize
                                style={{
                                    color: 'white',
                                    minWidth: '60px',
                                    maxWidth: '90%',
                                    width: `${isMobile ?
                                        (message.text.length < 26 ? ((message.text.length * 10) + 20) : 260) :
                                        (message.text.length < 90 ? message.text.length * 10 : 600)
                                        }px`,
                                    padding: 1
                                }}
                                disabled
                                value={message.text}
                            />
                            {/* {message.sentBy}: {message.text} */}
                            <br />
                            <span style={{ color: 'lightgray', fontSize: 12 }}>
                                {message.senderId === user._id &&
                                    // <DoneAllIcon sx={{ mb: -0.5, mx: 0.5, fontSize: 16, color: 'darkgray' }} />
                                    <DoneIcon sx={{ mb: -0.5, mx: 0.5, fontSize: 16, color: 'darkgray' }} />
                                }
                                {message.sentOn}
                            </span>
                        </div>
                    }
                    <span ref={messagesPageBottom}></span>
                </div>
            )}
        </Paper>
    )
}