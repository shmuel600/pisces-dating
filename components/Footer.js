import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import ChatRoundedIcon from '@mui/icons-material/ChatRounded';
import ChatOutlinedIcon from '@mui/icons-material/ChatOutlined';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderRoundedIcon from '@mui/icons-material/FavoriteBorderRounded';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import ListRoundedIcon from '@mui/icons-material/ListRounded';
import { useRouter } from 'next/router';
import * as React from 'react';

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
            sx={{
                position: 'fixed',
                bottom: 0,
                height: '10%',
                width: '100%',
                minWidth: '65vh',
                // backgroundColor: 'rgba(18,18,18,0.6)',
                background: 'linear-gradient(to top, rgba(18,18,18) 55%, rgba(48,48,48, 0.4) 30%, transparent)'
            }}
            value={page}
            onChange={handleChange}
        >
            <BottomNavigationAction
                label="Settings"
                value="settings"
                icon={
                    page === "settings" ?
                        <ListRoundedIcon sx={{ transform: 'scale(1.5)' }} /> :
                        <MenuRoundedIcon sx={{ transform: 'scale(1.5)' }} />
                }
                onClick={() => handleClick('settings')}
            />
            <BottomNavigationAction
                label="Locations"
                value="locations"
                icon={
                    page === "locations" ?
                        <LocationOnOutlinedIcon sx={{ transform: 'scale(1.5)' }} /> :
                        <LocationOnIcon sx={{ transform: 'scale(1.5)' }} />
                }
                onClick={() => handleClick('locations')}
            />
            <BottomNavigationAction
                label="Dates"
                value="dates"
                icon={
                    page === "dates" ?
                        <FavoriteBorderRoundedIcon sx={{ transform: 'scale(1.5)' }} /> :
                        <FavoriteIcon sx={{ transform: 'scale(1.5)' }} />
                }
                onClick={() => handleClick('dates')}
            />
            <BottomNavigationAction
                label="Chat"
                value="chat"
                icon={
                    page === "chat" ?
                        <ChatOutlinedIcon sx={{ transform: 'scale(1.5)' }} /> :
                        <ChatRoundedIcon sx={{ transform: 'scale(1.5)' }} />
                }
                onClick={() => handleClick('chat')}
            // or matched user profile pic
            />
            <BottomNavigationAction
                label="Profile"
                value="profile"
                icon={
                    page === "profile" ?
                        <AccountCircleOutlinedIcon sx={{ transform: 'scale(1.5)' }} /> :
                        <AccountCircleIcon sx={{ transform: 'scale(1.5)' }} />
                }
                onClick={() => handleClick('profile')}
            // or user profile pic
            />
        </BottomNavigation>
    );
}
