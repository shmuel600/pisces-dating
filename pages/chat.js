import MoreVertIcon from '@mui/icons-material/MoreVert';
import ExtensionIcon from '@mui/icons-material/Extension';
import ChatInput from '../components/chat/ChatInput';
import styles from '../styles/Home.module.css';
import Context from '../contexts/Context';
import * as React from 'react';
import { IconButton } from '@mui/material';
import Image from 'next/image';
import userDefault from '../public/userDefault.png';

function Chat() {
    const { user, isMobile, keyboardOpen, fullHeight, currentHeight } = React.useContext(Context);
    isMobile && console.log("mobile");
    keyboardOpen && console.log("keyboard open");
    const bottomPosition = isMobile ? (keyboardOpen ? '0%' : '10%') : '0%';
    const topPosition = !isMobile ? '11.5%' : '0%';
    return (
        <div style={{ maxHeight: `${fullHeight}`, padding: '0 1rem' }}>
            <div style={{ position: 'fixed', marginLeft: '-1rem', width: '100%', height: `${fullHeight * 1.2}px`, background: `url(${user.chatBackground})`, backgroundSize: 'cover', backgroundPosition: '50%' }}>
            </div>
            <div className={styles.main} style={{ color: 'whitesmoke' }}>
                <div style={{
                    position: 'fixed', bottom: `${bottomPosition}`, width: '100%', height: 70, transform: 'scale(1.01)',
                    display: 'flex', justifyContent: 'center', padding: 5, paddingRight: 15, paddingTop: 5,
                    backgroundImage: 'linear-gradient(to top, rgba(0,0,0,0.5), transparent, transparent)'
                }}>
                    <ChatInput />
                </div>
                <div style={{ width: '100%', maxWidth: '1000px', height: `calc(${currentHeight * 0.68}px)`, marginBottom: '20%' }}>
                    {/* chat window */}
                </div>
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
                                paddingRight: 20
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
                                alignItems: 'center'
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