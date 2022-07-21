import { Extension, MoreVert } from '@mui/icons-material';
import { IconButton, Typography } from '@mui/material';
import Image from 'next/image';
import styles from '../../styles/Home.module.css';
// import userDefault from '../../public/userDefault.png';
import * as React from 'react';

export default function Header({ user, isMobile }) {
    const [matchedUser, setMatchedUser] = React.useState();
    React.useEffect(() => {
        fetchMatchedUser();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    const fetchMatchedUser = async () => {
        try {
            const content = await fetch(`/api/user/${user.matchedUser}`);
            const fetchMatch = await content.json();
            setMatchedUser(fetchMatch);
        }
        catch (error) { console.log(error); }
    }
    const topPosition = !isMobile ? '11.5%' : '0%';
    return (
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
                    <MoreVert />
                </IconButton>
                <IconButton sx={{ color: 'rgba(255,255,255, 0.9)', width: 40, height: 40, m: 0.5 }} size='medium'>
                    <Extension />
                </IconButton>
            </div>
            {matchedUser &&
                <>
                    <Typography variant='subtitle1' sx={{ fontSize: 18 }} >{matchedUser.name}</Typography>
                    <Image className={styles.profileImage} src={matchedUser.profileImage} alt='profile image' width={30} height={30} sx={{ borderRadius: '50%' }} />
                </>
            }
        </div>
    )
}