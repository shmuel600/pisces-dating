import {
    // AccountCircle as Profile, AccountCircleOutlined as ProfileSelected,
    PersonRounded as Profile, PersonOutlineRounded as ProfileSelected,
    // ChatRounded as Chat, ChatOutlined as ChatSelected,
    QuestionAnswerRounded as Chat, QuestionAnswerOutlined as ChatSelected,
    Favorite as Dates, FavoriteBorderRounded as DatesSelected,
    MenuRounded as Settings,
    // ListRounded as SettingsSelected,
    FormatListBulletedRounded as SettingsSelected,
    // MenuOpenRounded as SettingsSelected,
    LocationOn as Locations, LocationOnOutlined as LocationsSelected
} from '@mui/icons-material';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import { useRouter } from 'next/router';
import * as React from 'react';
import Context from '../contexts/Context';
import styles from '../styles/Home.module.css';

export default function Navigation() {
    const router = useRouter();
    const [page, setPage] = React.useState('profile');
    const { darkMode } = React.useContext(Context);

    const handleChange = (event, newValue) => {
        setPage(newValue);
    };
    const handleClick = (path) => {
        router.replace(path)
    };

    return (
        <div>
            <BottomNavigation
                className={styles.nav}
                style={{
                    height: '10%',
                    width: '100%',
                    // minWidth: '65vh',
                    // backgroundColor: 'rgba(18,18,18,0.6)',
                    zIndex: 999
                }}
                // sx={dark ? { backgroundColor: 'rgb(12, 12, 12)' } : { backgroundColor: '#121212' }}
                sx={darkMode ? { background: 'linear-gradient(to top, rgb(08,08,08) 100%, rgba(14, 19, 20, 0.3) 30%, transparent)' } : undefined}
                value={page}
                onChange={handleChange}
            >
                <BottomNavigationAction
                    className={styles.navBtn}
                    // label="Settings"
                    value="settings"
                    sx={{ minWidth: 30 }}
                    icon={
                        // page === "settings" ?
                        //     <SettingsSelected sx={{ transform: 'scale(1.5)', m: 1 }} /> :
                        <Settings sx={{ transform: 'scale(1.5)', m: 1 }} />
                    }
                    onClick={() => handleClick('settings')}
                />
                <BottomNavigationAction
                    className={styles.navBtn}
                    // label="Locations"
                    value="locations"
                    sx={{ minWidth: 30 }}
                    icon={
                        // page === "locations" ?
                        //     <LocationsSelected sx={{ transform: 'scale(1.5)', m: 1 }} /> :
                        <Locations sx={{ transform: 'scale(1.5)', m: 1 }} />
                    }
                    onClick={() => handleClick('locations')}
                />
                <BottomNavigationAction
                    className={styles.navBtn}
                    // label="Dates"
                    value="dates"
                    sx={{ minWidth: 30 }}
                    icon={
                        // page === "dates" ?
                        //     <DatesSelected sx={{ transform: 'scale(1.5)', m: 1 }} /> :
                        <Dates sx={{ transform: 'scale(1.5)', m: 1 }} />
                    }
                    onClick={() => handleClick('dates')}
                />
                <BottomNavigationAction
                    className={styles.navBtn}
                    // label="Chat"
                    value="chat"
                    sx={{ minWidth: 30 }}
                    icon={
                        // page === "chat" ?
                        //     <ChatSelected sx={{ transform: 'scale(1.5)', m: 1 }} /> :
                        <Chat sx={{ transform: 'scale(1.5)', m: 1 }} />
                    }
                    // onClick={() => handleClick('findMatch')}
                    onClick={() => handleClick('chat')}
                // or matched user profile pic
                />
                <BottomNavigationAction
                    className={styles.navBtn}
                    // label="Profile"
                    value="profile"
                    sx={{ minWidth: 30 }}
                    icon={
                        // page === "profile" ?
                        //     <ProfileSelected sx={{ transform: 'scale(1.5)', m: 1 }} /> :
                        <Profile sx={{ transform: 'scale(1.5)', m: 1 }} />
                    }
                    onClick={() => handleClick('profile')}
                // or user profile pic
                />
            </BottomNavigation>
        </div >
    );
}
