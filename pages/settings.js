import Link from "next/link";
import styles from '../styles/Home.module.css';

function Settings() {
    return (
        <div className={styles.container}>
            <div className={styles.main} style={{ color: 'whitesmoke' }}>
                Settings
                <br />
                <Link href="/">Home</Link>
            </div>
        </div>
    )
}

export default Settings;