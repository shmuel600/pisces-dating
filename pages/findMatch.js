import Context from '../contexts/Context';
import * as React from 'react';
import styles from '../styles/Home.module.css';

function FindMatch() {
    const { user } = React.useContext(Context);
    const findMatch = () => {
        // console.log(value, "updated");
        fetch(`/api/user/${user._id}/match`, {
            method: 'PATCH',
            // headers: { 'Content-Type': 'application/json' },
            // body: JSON.stringify({ hobbies: value })
        });
    }
    return (
        <div className={styles.container}>
            <div className={styles.main}>
                <button onClick={findMatch}>find new match</button>
            </div>
        </div>
    )
}

export default FindMatch;