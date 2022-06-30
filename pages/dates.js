import Link from "next/link";
import styles from '../styles/Home.module.css';

function Dates() {
    return (
        <div className={styles.container}>
            <div className={styles.main} style={{ color: 'whitesmoke' }}>
                Dates
                <br />
                <Link href="/">Home</Link>
            </div>
        </div>
    )
}

export default Dates;