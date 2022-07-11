import Personality from '@mui/icons-material/BarChartRounded';
import UploadProfileImage from '@mui/icons-material/PhotoCameraRounded';
import ShareProfile from '@mui/icons-material/ShareRounded';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Image from 'next/image';
import Fab from '@mui/material/Fab';
import userDefault from '../../public/userDefault.png';
import { Box, IconButton } from '@mui/material';
import * as React from 'react';
import Context from '../../contexts/Context';
import styles from '../../styles/Home.module.css';

export default function Top() {
    const { user } = React.useContext(Context);
    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };
    const getAge = (Birthday) => {
        const yearDifference = new Date().getUTCFullYear() - new Date(Birthday).getUTCFullYear();
        const currentDate = new Date().getMonth() * 100 + new Date().getDate();
        const birthDate = new Date(Birthday).getMonth() * 100 + new Date(Birthday).getDate();
        const birthdayPassed = currentDate < birthDate ? false : true;
        const age = birthdayPassed ? yearDifference : yearDifference - 1;
        return age;
    }
    return (
        <>
            <Image className={styles.profileImage} src={userDefault} alt='profile image' width={100} height={100} />
            <Fab color="primary" aria-label="add" size='medium' sx={{ mr: '100px', mt: '-20px' }}>
                <UploadProfileImage />
            </Fab>
            <Box sx={{ m: 1 }}>
                <Box className={styles.title} sx={{}}>
                    {user.name}
                </Box>
                <Box className={styles.description}>
                    <IconButton color="primary" variant="extended" onClick={handleOpenNavMenu}>
                        <Personality sx={{ width: '20px', height: '20px' }} />
                        <Box sx={{ fontSize: 'small' }}>
                            {user.personalityType.toUpperCase()}
                        </Box>
                    </IconButton>
                    {/* <span>{user.gender} </span> */}
                    <span>{getAge(user.birthday)} </span>
                    <IconButton color="primary">
                        <ShareProfile />
                    </IconButton>
                </Box>
            </Box>
            <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                    display: { xs: 'block', md: 'none' },
                }}
            >
                <MenuItem onClick={() => handleCloseNavMenu()}>
                    View Results
                </MenuItem>
                <MenuItem onClick={() => handleCloseNavMenu()}>
                    Retake Test
                </MenuItem>
            </Menu>
        </>
    )
}