import Link from "next/link";
import styles from '../styles/Home.module.css';

function Locations() {
    return (
        <div className={styles.container}>
            <div className={styles.main} style={{ color: 'whitesmoke' }}>
                Locations
                <br />
                <Link href="/">Home</Link>
            </div>
        </div>
    )
}

export default Locations;