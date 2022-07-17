import * as React from 'react';
import About from '../components/profile/About';
import Hobbies from '../components/profile/Hobbies';
import LoveLanguages from '../components/profile/LoveLanguages';
import Top from '../components/profile/Top';
import Context from '../contexts/Context';
import styles from '../styles/Home.module.css';
import Settings from '../pages/settings';

export default function Profile() {
    const { darkMode, setInApp } = React.useContext(Context);
    React.useEffect(() => {
        setInApp(true);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return (
        <div className={styles.profileContainer}>
            <div className={styles.profileMain} style={darkMode ? { color: 'whitesmoke' } : undefined}>
                <Top />
                <hr />
                <About />
                <hr />
                <Hobbies />
                <hr />
                <LoveLanguages />
                <br />
                <br />
            </div>
            <div className={styles.profileSide}>
                {/* maybe add here 'liked locations' list, matched user profile (view only), and matched locations */}
                <Settings />
            </div>
        </div>
    )
}