import Personality from '@mui/icons-material/BarChartRounded';
import UploadProfileImage from '@mui/icons-material/PhotoCameraRounded';
import ShareProfile from '@mui/icons-material/ShareRounded';
import { Box, IconButton } from '@mui/material';
import Fab from '@mui/material/Fab';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { styled } from '@mui/material/styles';
import Image from 'next/image';
import * as React from 'react';
import Context from '../../contexts/Context';
import styles from '../../styles/Home.module.css';

const Input = styled('input')({
    display: 'none',
});

export default function Top() {
    const { user } = React.useContext(Context);
    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [profileImage, setProfileImage] = React.useState();
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
    const profilePicInputRef = React.useRef();
    const uploadProfileImage = (file) => {
        user.profileImage = profileImage;
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            setProfileImage(reader.result);
            fetch(`api/profile`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ data: reader.result, id: user._id })
            })
                .then(url => console.log("url", url));
        };
    }
    return (
        <>
            <Image className={styles.profileImage} src={user.profileImage} alt='profile image' width={100} height={100} />
            <Fab color="primary" aria-label="add" size='medium' sx={{ mr: '100px', mt: '-20px', zIndex: 1 }} onClick={() => profilePicInputRef.current.click()}>
                <Input accept="image/*" ref={profilePicInputRef} multiple type="file" onChange={(e) => uploadProfileImage(e.target.files[0])} />
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
                    horizontal: 'left',
                }}
                keepMounted
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
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