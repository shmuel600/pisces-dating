import Profile from '@mui/icons-material/AccountCircle';
import ProfileSelected from '@mui/icons-material/AccountCircleOutlined';
import Chat from '@mui/icons-material/ChatRounded';
import ChatSelected from '@mui/icons-material/ChatOutlined';
import Dates from '@mui/icons-material/Favorite';
import DatesSelected from '@mui/icons-material/FavoriteBorderRounded';
import Locations from '@mui/icons-material/LocationOn';
import LocationsSelected from '@mui/icons-material/LocationOnOutlined';
import Settings from '@mui/icons-material/MenuRounded';
import SettingsSelected from '@mui/icons-material/ListRounded';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import { useRouter } from 'next/router';
import * as React from 'react';
import styles from '../styles/Home.module.css';
// import Settings from '@mui/icons-material/Settings';
// import SettingsSelected from '@mui/icons-material/SettingsOutlined';

export default function Footer() {
    const router = useRouter();
    const [page, setPage] = React.useState('profile');

    const handleChange = (event, newValue) => {
        setPage(newValue);
    };
    const handleClick = (path) => {
        router.push(path)
    };

    return (
        <BottomNavigation
            className={styles.nav}
            sx={{
                position: 'fixed',
                bottom: 0,
                height: '10%',
                width: '100%',
                minWidth: '65vh',
                // backgroundColor: 'rgba(18,18,18,0.6)',
                background: 'linear-gradient(to top, rgba(18,18,18) 55%, rgba(53, 64, 60, 0.3) 30%, transparent)'
            }}
            value={page}
            onChange={handleChange}
        >
            <BottomNavigationAction
                label="Settings"
                value="settings"
                icon={
                    page === "settings" ?
                        <SettingsSelected sx={{ transform: 'scale(1.8)', m: 1 }} /> :
                        <Settings sx={{ transform: 'scale(1.8)', m: 1 }} />
                }
                onClick={() => handleClick('settings')}
            />
            <BottomNavigationAction
                label="Locations"
                value="locations"
                icon={
                    page === "locations" ?
                        <LocationsSelected sx={{ transform: 'scale(1.8)', m: 1 }} /> :
                        <Locations sx={{ transform: 'scale(1.8)', m: 1 }} />
                }
                onClick={() => handleClick('locations')}
            />
            <BottomNavigationAction
                label="Dates"
                value="dates"
                icon={
                    page === "dates" ?
                        <DatesSelected sx={{ transform: 'scale(1.8)', m: 1 }} /> :
                        <Dates sx={{ transform: 'scale(1.8)', m: 1 }} />
                }
                onClick={() => handleClick('dates')}
            />
            <BottomNavigationAction
                label="Chat"
                value="chat"
                icon={
                    page === "chat" ?
                        <ChatSelected sx={{ transform: 'scale(1.8)', m: 1 }} /> :
                        <Chat sx={{ transform: 'scale(1.8)', m: 1 }} />
                }
                onClick={() => handleClick('chat')}
            // or matched user profile pic
            />
            <BottomNavigationAction
                label="Profile"
                value="profile"
                icon={
                    page === "profile" ?
                        <ProfileSelected sx={{ transform: 'scale(1.8)', m: 1 }} /> :
                        <Profile sx={{ transform: 'scale(1.8)', m: 1 }} />
                }
                onClick={() => handleClick('profile')}
            // or user profile pic
            />
        </BottomNavigation>
    );
}
