import * as React from 'react';
import io from 'Socket.IO-client';
import Input from '../components/chat/Input';
import Header from '../components/chat/Header';
import Messages from '../components/chat/Messages';
import Context from '../contexts/Context';
import styles from '../styles/Home.module.css';
let socket;

function Chat() {
    const { user, isMobile, keyboardOpen, fullHeight, currentHeight } = React.useContext(Context);
    const bottomPosition = isMobile ? (keyboardOpen ? '0%' : '10%') : '0%';
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
        // console.log(io);
        socket.on('connect', () => {
            console.log('connected');
        })
        socket.on('update-input', msg => {
            console.log("ELAD-CLIENT", msg);
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
            <div
                style={{
                    position: 'fixed',
                    marginLeft: '-1rem',
                    width: '100%',
                    height: `${fullHeight * 1.2}px`,
                    background: `url(${user.chatBackground})`,
                    backgroundSize: 'cover',
                    backgroundPosition: '50%'
                }}
            >
            </div>
            {/* chat */}
            <div className={styles.main} style={{ color: 'whitesmoke' }}>
                {/* input */}
                <div style={{
                    position: 'fixed', bottom: `${bottomPosition}`, width: '100%', height: 70, transform: 'scale(1.025)',
                    display: 'flex', justifyContent: 'center', padding: 5, paddingRight: 15, paddingTop: 5,
                    backgroundImage: 'linear-gradient(to top, rgba(0,0,0,0.5), transparent, transparent)'
                }}>
                    <Input onSend={onChangeHandler} />
                </div>
                {/* messages */}
                <Messages user={user} messages={messages} currentHeight={currentHeight} isMobile={isMobile} messagesPageBottom={messagesPageBottom} />
                {/* header */}
                <Header isMobile={isMobile} />
            </div>
        </div >
    )
}

export default Chat;