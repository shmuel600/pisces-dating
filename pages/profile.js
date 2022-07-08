import * as React from 'react';
import About from '../components/profile/About';
import Hobbies from '../components/profile/Hobbies';
import LoveLanguages from '../components/profile/LoveLanguages';
import Top from '../components/profile/Top';
import Context from '../contexts/Context';
import styles from '../styles/Home.module.css';

export default function Profile() {
    const { dark } = React.useContext(Context);
    return (
        <div className={styles.profileContainer}>
            <div className={styles.profileMain} style={dark ? { color: 'whitesmoke' } : undefined}>
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

            </div>
        </div>
    )
}