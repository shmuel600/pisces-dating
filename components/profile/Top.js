import Personality from '@mui/icons-material/BarChartRounded';
import UploadProfileImage from '@mui/icons-material/PhotoCameraRounded';
import ShareProfile from '@mui/icons-material/ShareRounded';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Image from 'next/image';
import Fab from '@mui/material/Fab';
import userDefault from '../../public/userDefault.png';
import { Box } from '@mui/material';
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
                    <Fab variant="extended" onClick={handleOpenNavMenu} sx={{ backgroundColor: 'transparent !important', color: 'rgb(144,202,249)', boxShadow: 0 }}>
                        <Personality sx={{ width: '20px', height: '20px' }} />
                        {user.personalityType.toUpperCase()}
                    </Fab>
                    <span>{user.gender} </span>
                    <span>{user.age} </span>
                    <Fab sx={{ mx: 2, width: '20px', height: '20px', backgroundColor: 'transparent !important', color: 'rgb(144,202,249)', boxShadow: 0 }}>
                        <ShareProfile />
                    </Fab>
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