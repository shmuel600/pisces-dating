import MoreVertIcon from '@mui/icons-material/MoreVert';
import ExtensionIcon from '@mui/icons-material/Extension';
import ChatInput from '../components/chat/ChatInput';
import styles from '../styles/Home.module.css';
import Context from '../contexts/Context';
import * as React from 'react';
import { IconButton, Paper, TextareaAutosize } from '@mui/material';
import Image from 'next/image';
import userDefault from '../public/userDefault.png';
import io from 'Socket.IO-client';
let socket;

function Chat() {
    const { user, isMobile, keyboardOpen, fullHeight, currentHeight, darkMode } = React.useContext(Context);
    const bottomPosition = isMobile ? (keyboardOpen ? '0%' : '10%') : '0%';
    const topPosition = !isMobile ? '11.5%' : '0%';
    const messagesPageBottom = React.useRef();
    // isMobile && console.log("mobile");
    // keyboardOpen && console.log("keyboard open");
    const [messages, setMessages] = React.useState([{}]);
    React.useEffect(() => {
        socketInitializer()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    const socketInitializer = async () => {
        await fetch('/api/chat/1');
        socket = io();
        socket.on('connect', () => {
            console.log('connected');
        })
        socket.on('update-input', msg => {
            setMessages(msg);
            messagesPageBottom.current?.scrollIntoView({ behavior: "smooth" });
        })
    }
    const onChangeHandler = (message) => {
        console.log("got message: ", message);
        const today = new Date();
        const send = [...messages, {
            text: message,
            sentBy: user.name,
            senderId: user._id,
            sent: (today.getHours() + ":" + today.getMinutes())
        }];
        setMessages(send);
        socket.emit('input-change', send);
        messagesPageBottom.current?.scrollIntoView({ behavior: "smooth" });
    }
    return (
        <div style={{ maxHeight: `${fullHeight}`, padding: '0 1rem' }}>
            {/* background */}
            <div style={{ position: 'fixed', marginLeft: '-1rem', width: '100%', height: `${fullHeight * 1.2}px`, background: `url(${user.chatBackground})`, backgroundSize: 'cover', backgroundPosition: '50%' }}>
            </div>
            {/* chat */}
            <div className={styles.main} style={{ color: 'whitesmoke' }}>
                {/* input */}
                <div style={{
                    position: 'fixed', bottom: `${bottomPosition}`, width: '100%', height: 70, transform: 'scale(1.01)',
                    display: 'flex', justifyContent: 'center', padding: 5, paddingRight: 15, paddingTop: 5,
                    backgroundImage: 'linear-gradient(to top, rgba(0,0,0,0.5), transparent, transparent)'
                }}>
                    <ChatInput onSend={onChangeHandler} />
                </div>
                {/* messages */}
                <Paper
                    sx={{ background: 'transparent', boxShadow: 'none', overflowY: 'auto', overflowX: 'hidden' }}
                    style={{ width: '100%', maxWidth: '1000px', height: `${currentHeight * (isMobile ? '0.68' : '0.78')}px`, top: '11%', position: 'absolute' }}
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
                                                maxWidth: '80%',
                                                padding: 8,
                                                margin: 5,
                                                marginLeft: '2%',
                                                marginBottom: 10,
                                                background: `${darkMode ? '#329cbc' : 'rgb(25, 118, 210)'}`,
                                                color: 'white',
                                                borderRadius: 15,
                                                alignSelf: 'flex-start'
                                            }
                                            :
                                            {
                                                height: 'fit-content',
                                                // minHeight: '50',
                                                maxWidth: '80%',
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
                                        style={{ color: 'white' }}
                                        disabled
                                        value={message.text}
                                    />
                                    {/* {message.sentBy}: {message.text} */}
                                    <br />
                                    <span style={{ color: 'lightgray', fontSize: 12 }}>{message.sent}</span>
                                </div>
                            }
                            <span ref={messagesPageBottom}></span>
                        </div>
                    )}
                </Paper>
                {/* header */}
                <div
                    style={
                        isMobile ?
                            {
                                backgroundColor: 'rgb(40,40,40)',
                                width: '100%',
                                height: '70px',
                                position: 'fixed',
                                top: `${topPosition}`,
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                paddingRight: 20,
                                zIndex: 6
                            }
                            :
                            {
                                backgroundColor: 'rgba(0,0,0,0.4)',
                                width: '70px',
                                height: '30%',
                                position: 'fixed',
                                left: 0,
                                paddingBottom: 20,
                                paddingRight: 20,
                                paddingLeft: 10,
                                borderRadius: '0 40px 40px 0',
                                top: `${topPosition}`,
                                // transform: 'rotate(180deg)',
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                zIndex: 6
                            }
                    }
                >
                    <div>
                        <IconButton sx={{ color: 'rgba(255,255,255, 0.9)', width: 40, height: 40, m: 0.5 }} size='medium'>
                            <MoreVertIcon />
                        </IconButton>
                        <IconButton sx={{ color: 'rgba(255,255,255, 0.9)', width: 40, height: 40, m: 0.5 }} size='medium'>
                            <ExtensionIcon />
                        </IconButton>
                    </div>
                    <Image className={styles.profileImage} src={userDefault} alt='profile image' width={30} height={30} sx={{ borderRadius: '50%' }} />
                </div>
            </div>
        </div >
    )
}

export default Chat;