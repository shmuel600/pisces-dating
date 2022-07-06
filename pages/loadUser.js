import { useRouter } from 'next/router';
import * as React from 'react';
import Pisces from '../components/Pisces';
import Context from '../contexts/Context';
import styles from '../styles/Home.module.css';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

function LoadUser() {
    const { setRegistered, setUser, userId } = React.useContext(Context);
    React.useEffect(() => { fetchUser() }, []);
    const fetchUser = () => {
        fetch(`/api/user/${userId}`)
            .then(content => content.json())
            .then(fetchedUser => {
                setUser(fetchedUser);
                loadProfile();
            })
            .catch(error => console.log(error));
    };
    const router = useRouter();
    const loadProfile = async () => {
        await router.push('profile');
        setRegistered(true);
    }
    return (
        <div className={styles.container}>
            <div className={styles.main} style={{ color: 'whitesmoke' }}>
                <Pisces className={styles.logo} />
                <br />
                <br />
                <br />
                <Box sx={{ display: 'flex' }} onClick={() => loadProfile()}>
                    <CircularProgress />
                </Box>
            </div>
        </div>
    )
}

export default LoadUser;
