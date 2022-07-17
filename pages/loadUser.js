import { Box, CircularProgress } from '@mui/material';
import { useSession } from "next-auth/react";
import { useRouter } from 'next/router';
import * as React from 'react';
import Pisces from '../components/Pisces';
import Context from '../contexts/Context';
import styles from '../styles/Home.module.css';

function LoadUser() {
    const { data: session } = useSession();
    const { setUser, setDarkMode } = React.useContext(Context);
    const router = useRouter();
    React.useEffect(() => {
        fetchUser();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    const fetchUser = () => {
        console.log(session.user);
        fetch(`/api/user/${session.user.email}`)
            // fetch(`/api/user/${'dev@sketch.com'}`)
            .then(content => content.json())
            .then(fetchedUser => {
                setUser(fetchedUser);
                setDarkMode(fetchedUser.darkMode);
                router.replace('profile');
            })
            .catch(error => router.push('registerUser'));
        // .catch(error => console.log(error));
    };
    return (
        <Box className={styles.container}>
            <div className={styles.main}>
                <Pisces className={`${styles.logo} ${styles.skeleton}`} load={"load"} />
                <br />
                <br />
                <br />
                {/* <Box sx={{ display: 'flex' }}>
                    <CircularProgress sx={{ color: 'whitesmoke' }} />
                </Box> */}
            </div>
        </Box>
    )
}

export default LoadUser;
