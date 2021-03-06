import { Box, CircularProgress } from '@mui/material';
import { useSession } from "next-auth/react";
import { useRouter } from 'next/router';
import * as React from 'react';
import Pisces from '../components/Pisces';
import Context from '../contexts/Context';
import styles from '../styles/Home.module.css';

function LoadUser() {
    const { data: session } = useSession();
    const { setUser } = React.useContext(Context);
    const router = useRouter();
    React.useEffect(() => {
        session && fetchUser();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    const fetchUser = async () => {
        console.log("fetch user");
        try {
            const content = await fetch(`/api/user/${session.user.email}`)
            const fetchedUser = await content.json();
            await setUser(fetchedUser);
            router.replace('profile');
        }
        catch (error) {
            // console.log(error);
            router.replace('registerUser');
        }

        // fetch(`/api/user/${'dev@sketch.com'}`)

        // fetch(`/api/user/${session.user.email}`)
        //     .then(content => content.json())
        //     .then(fetchedUser => {
        //         setUser(fetchedUser);
        //         setDarkMode(fetchedUser.darkMode);
        //         router.replace('profile');
        //     })
        //     .catch(error => router.replace('registerUser'));

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
