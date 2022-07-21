import {
    PersonRounded as Profile, PersonOutlineRounded as ProfileSelected,
    QuestionAnswerRounded as Chat, QuestionAnswerOutlined as ChatSelected,
    Favorite as Dates, FavoriteBorderRounded as DatesSelected,
    MenuRounded as Settings,
    FormatListBulletedRounded as SettingsSelected,
    LocationOn as Locations, LocationOnOutlined as LocationsSelected
} from '@mui/icons-material';
import { BottomNavigation, BottomNavigationAction } from '@mui/material';
// import BottomNavigation from '@mui/material/BottomNavigation';
// import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import { useRouter } from 'next/router';
import * as React from 'react';
import Pisces from '../components/Pisces';
import Context from '../contexts/Context';
import styles from '../styles/Home.module.css';

export default function Navigation() {
    const router = useRouter();
    const [page, setPage] = React.useState('profile');
    const { user, darkMode } = React.useContext(Context);

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
                        user.chat === null ?
                            <svg
                                className=''
                                style={{
                                    maxWidth: 33,
                                    maxHeight: 33,
                                    transform: 'scale(1.5)',
                                    fill: `currentColor`
                                }}
                                xmlns="http://www.w3.org/2000/svg"
                                width={460}
                                height={400}
                                viewBox="0 0 350 250"
                            >
                                <path d="M134 21.4c0 .4 2 3.6 4.5 7 6.4 9.1 11.9 20.7 14.8 31.4 1.4 5.2 2.7 9.5 2.9 9.7.2.2 2.8-.3 5.8-1.1 5.6-1.4 17.1-1.7 22.5-.5 2.3.5.6 1-6.9 1.9-5.5.7-14 2.6-19 4.3-11 3.7-39.8 18.2-50.9 25.7-9.9 6.7-16 8.6-22.6 7.1-2.5-.5-5.7-1.7-7.1-2.6-1.4-.9-9.7-8.9-18.5-17.8C45.4 72.1 42.6 69.8 36 66.6c-6.5-3.1-19.6-6.3-20.8-5.1-.2.2.7 3.2 2.1 6.7 1.5 3.7 3 10.5 3.7 16.3 2.4 20.8 11.8 38.8 23.5 45.1 1.9 1 3.5 2.1 3.5 2.4 0 .3-2 1.6-4.5 2.9-6 3.2-13.1 10.9-16.2 17.8-2.2 4.7-2.7 7.6-3.2 18.2-.6 11.1-1 13.2-3.3 17.3-1.5 2.7-2.3 4.8-1.8 4.8 3 0 16.4-3.2 20.9-5 8.7-3.4 18.9-10.8 29.1-21.1 11.7-11.8 14.3-13.3 22.3-12.6 4.8.4 7 1.3 11.4 4.4 17.8 12.6 33.8 23 40.3 26.3 8.8 4.4 21.6 8.6 29.2 9.6 2.9.4 6 1 6.8 1.4 2.4 1.3-9.6 2.3-19.7 1.7-8.7-.6-9.3-.5-10.8 1.6-.8 1.2-1.5 3.1-1.5 4.2 0 3.4-4.4 11.7-9.5 17.8-3.3 4.1-4.4 6.2-3.7 6.9 1.8 1.8 23.5-.6 32.6-3.7 14.8-4.9 26.5-11.7 37.1-21.7l5.1-4.7 13.9-2c34.8-5.2 61.5-15.9 86.6-34.7 5.4-4.1 11.9-10 14.5-13.2 2.6-3.1 6.8-7.8 9.2-10.3 2.4-2.6 4.2-5.4 4-6.2-.1-.9-4.7-6.4-10.2-12.2-8.2-8.9-12.3-12.3-24.8-20.5-22.7-15.1-48.2-26.5-63.6-28.5-5.1-.7-5.7-1.1-14-9.7-23-23.8-51.4-37.8-79.9-39.5-5.7-.3-10.3-.3-10.3.1zm154.5 92.1c7 6.9-3 17-10.2 10.3-1.4-1.3-2.3-3.3-2.3-5 0-3.6 4-7.8 7.5-7.8 1.4 0 3.7 1.1 5 2.5z" />
                            </svg> :
                            <Chat sx={{ transform: 'scale(1.5)', m: 1 }} />
                        // or matched user profile pic
                    }
                    onClick={() => handleClick(`${user.chat === null ? 'findMatch' : 'chat'}`)}
                // onClick={() => handleClick('findMatch')}
                // onClick={() => handleClick('chat')}
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
