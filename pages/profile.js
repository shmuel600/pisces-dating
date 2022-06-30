import Link from "next/link";
import styles from '../styles/Home.module.css';

function Profile() {
    return (
        <div className={styles.container}>
            <div className={styles.main} style={{ color: 'whitesmoke' }}>
                Profile
                <br />
                <Link href="/">Home</Link>
            </div>
        </div>
    )
}

export default Profile;