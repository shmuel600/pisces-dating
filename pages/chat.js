import * as React from 'react';
import io from 'Socket.IO-client';
import Header from '../components/chat/Header';
import Input from '../components/chat/Input';
import Background from '../components/chat/Background';
import Messages from '../components/chat/Messages';
import Context from '../contexts/Context';
import styles from '../styles/Home.module.css';
let socket;

function Chat() {
    const [messages, setMessages] = React.useState([]);
    const { user, isMobile, keyboardOpen, fullHeight, currentHeight } = React.useContext(Context);
    const pageBottom = React.useRef();
    React.useEffect(() => {
        // if (user.chat === null) route to find match (because there is no match yet)
        // on find match need to get matchedUser and chat (room id) patched to user
        // create chat only if user.chat exists in chat history - at `api/chat/history/${user.chat}` (need to add that route too)
        // if user.chat doesnt exist in chat history, start chat
        createChat();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    React.useEffect(() => {
        // messages.length > 0 && update chat history at `api/chat/history/${user.chat}` (need to add that route too)
    }, [messages]);
    const createChat = async () => {
        console.log("create chat");
        // handle creating chat history on mongoDB
        startChat();
    }
    const startChat = async () => {
        console.log("start chat");
        await fetch(`/api/chat/${user.chat}`);
        // add here fetch from chat history at `api/chat/history/${user.chat}` (need to add that route too)
        // setMessages based on fetched chat history
        socket = io()
        socket.emit('join', user.chat);
        socket.on('connect', () => {
            console.log('connected')
        })
        socket.on('update', msg => {
            setMessages(msg);
            scrollToBottom();
        })
        socket.on('joined', room => {
            console.log("joined ", room);
        })
    }
    const getMessage = (text) => {
        const sentOn = new Date().toLocaleTimeString('en-US',
            {
                hour12: false,
                hour: "numeric",
                minute: "numeric"
            });
        const send = [...messages, {
            text,
            sentBy: user.name,
            senderId: user._id,
            sentOn
        }];
        return send;
    }
    const onSend = (message) => {
        const send = getMessage(message);
        socket.emit('change', send);
        setMessages(send);
        scrollToBottom();
    }
    const scrollToBottom = () => {
        console.log("scroll to bottom");
        pageBottom.current?.scrollIntoView({ behavior: "smooth" });
    }

    return (
        <div style={{ maxHeight: `${fullHeight}`, padding: '0 1rem' }}>
            <Background
                user={user}
                fullHeight={fullHeight}
            />
            <div className={styles.main} style={{ color: 'whitesmoke' }}>
                <Input
                    onSend={onSend}
                    // bottomPosition={isMobile ? (keyboardOpen ? '0%' : '10%') : '0%'}
                    bottomPosition={(isMobile && !keyboardOpen) ? '10%' : '0%'}
                />
                <Messages
                    user={user}
                    messages={messages}
                    currentHeight={currentHeight}
                    isMobile={isMobile}
                    pageBottom={pageBottom}
                />
                <Header
                    user={user}
                    isMobile={isMobile}
                />
            </div>
        </div >
    )
}

export default Chat;