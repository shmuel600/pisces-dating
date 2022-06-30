import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ChatRoundedIcon from '@mui/icons-material/ChatRounded';
import FavoriteIcon from '@mui/icons-material/Favorite';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import { useRouter } from 'next/router';
import * as React from 'react';

export default function Footer() {
    const router = useRouter();
    const [value, setValue] = React.useState('');

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    const handleClick = (path) => {
        router.push(path)
    };

    return (
        <BottomNavigation sx={{ position: 'fixed', bottom: 0, height: '10%', width: '100%', minWidth: '65vh', backgroundColor: 'rgba(18,18,18,0.6)' }} value={value} onChange={handleChange}>
            <BottomNavigationAction
                label="Settings"
                value="settings"
                icon={<MenuRoundedIcon sx={{ transform: 'scale(1.5)' }} />}
                onClick={() => handleClick('settings')}
            />
            <BottomNavigationAction
                label="Locations"
                value="locations"
                icon={<LocationOnIcon sx={{ transform: 'scale(1.5)' }} />}
                onClick={() => handleClick('locations')}
            />
            <BottomNavigationAction
                label="Dates"
                value="dates"
                icon={<FavoriteIcon sx={{ transform: 'scale(1.5)' }} />}
                onClick={() => handleClick('dates')}
            />
            <BottomNavigationAction
                label="Chat"
                value="chat"
                icon={<ChatRoundedIcon sx={{ transform: 'scale(1.5)' }} />}
                onClick={() => handleClick('chat')}
            // or matched user profile pic
            />
            <BottomNavigationAction
                label="Profile"
                value="profile"
                icon={<AccountCircleIcon sx={{ transform: 'scale(1.5)' }} />}
                onClick={() => handleClick('profile')}
            // or user profile pic
            />
        </BottomNavigation>
    );
}
