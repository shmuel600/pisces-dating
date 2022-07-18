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
import DoneIcon from '@mui/icons-material/Done';
import DoneAllIcon from '@mui/icons-material/DoneAll';
let socket;

function Chat() {
    const { user, isMobile, keyboardOpen, fullHeight, currentHeight } = React.useContext(Context);
    const bottomPosition = isMobile ? (keyboardOpen ? '0%' : '10%') : '0%';
    const topPosition = !isMobile ? '11.5%' : '0%';
    const messagesPageBottom = React.useRef();
    // const onScreen = useOnScreen(messagesPageBottom, "-300px");
    // console.log("is it viewed? ", onScreen);
    // isMobile && console.log("mobile");
    // keyboardOpen && console.log("keyboard open");
    const previousMessages = user.chat?.messages === undefined ? [] : user.chat.messages;
    const [messages, setMessages] = React.useState(previousMessages);
    console.log("messages?", messages);
    React.useEffect(() => {
        // console.log("use effect");
        user.chat === null ? createChat() : socketInitializer();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    const createChat = async () => {
        console.log("create chat");
        const chat = await fetch("/api/chat", {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ userId: user._id })
        }).catch((error) => console.log(error));
        socketInitializer();
        // console.log("id:", chat._id);
        // fetch(`/api/user/${user._id}`, {
        //     method: 'PATCH',
        //     headers: { 'Content-Type': 'application/json' },
        //     body: JSON.stringify({ chat: chat._id })
        // }).catch((error) => console.log(error))
    }
    const socketInitializer = async () => {
        console.log("initialize chat");
        // await fetch(`/api/chat/${user.chat._id}`);
        socket = io();
        socket.on('connect', () => {
            console.log('connected');
        })
        socket.on('update-input', msg => {
            setMessages(msg);
            scrollToBottom();
        })
    }
    const onChangeHandler = async (message) => {
        console.log("got message: ", message);
        const sentOn = new Date().toLocaleTimeString('en-US',
            {
                hour12: false,
                hour: "numeric",
                minute: "numeric"
            });
        const send = [...messages, {
            text: message,
            sentBy: user.name,
            senderId: user._id,
            // sentOn: (today.getHours() + ":" + today.getMinutes())
            sentOn
        }];
        setMessages(send);
        // console.log("user chat: ", user.chat?._id);
        await socket.emit('input-change', send);
        await fetch(`/api/chat/${user.chat._id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ messages: send })
        })
        scrollToBottom();
    }
    const scrollToBottom = () => {
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
                    position: 'fixed', bottom: `${bottomPosition}`, width: '100%', height: 70, transform: 'scale(1.025)',
                    display: 'flex', justifyContent: 'center', padding: 5, paddingRight: 15, paddingTop: 5,
                    backgroundImage: 'linear-gradient(to top, rgba(0,0,0,0.5), transparent, transparent)'
                }}>
                    <ChatInput onSend={onChangeHandler} />
                </div>
                {/* messages */}
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
                                // transform: 'scale(1.025)',
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