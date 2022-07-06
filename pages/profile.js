import * as React from 'react';
import About from '../components/profile/About';
import Hobbies from '../components/profile/Hobbies';
import LoveLanguages from '../components/profile/LoveLanguages';
import Top from '../components/profile/Top';
import Context from '../contexts/Context';
import styles from '../styles/Home.module.css';

export default function Profile() {
    const { user } = React.useContext(Context);
    return (
        <div className={styles.container}>
            <div className={styles.main} style={{ color: 'whitesmoke' }}>
                <Top />
                <hr />
                <About />
                <hr />
                <Hobbies />
                <hr />
                <LoveLanguages />
            </div>
        </div>
    )
}