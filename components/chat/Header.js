import { Extension, MoreVert } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import Image from 'next/image';
import styles from '../../styles/Home.module.css';
import userDefault from '../../public/userDefault.png';

export default function Header({ isMobile }) {
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
            <Image className={styles.profileImage} src={userDefault} alt='profile image' width={30} height={30} sx={{ borderRadius: '50%' }} />
        </div>
    )
}