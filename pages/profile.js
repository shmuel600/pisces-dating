import styles from '../styles/Home.module.css';
import Image from 'next/image';
import userDefault from '../public/userDefault.png';
import Fab from '@mui/material/Fab';
import AddImage from '@mui/icons-material/PhotoCameraRounded';

function Profile() {
    return (
        <div className={styles.container}>
            <div className={styles.main} style={{ color: 'whitesmoke' }}>
                <Image className={styles.profileImage} src={userDefault} alt='profile image'
                    width={100} height={100} />
                <Fab color="primary" aria-label="add" size='medium' sx={{ mr: '100px', mt: '-20px' }}>
                    <AddImage />
                </Fab>
                <br />
                {/* <hr /> */}
                <br />
                <h1 className={styles.title} style={{ color: 'whitesmoke' }}>
                    {"Name Familyname, 29"}
                </h1>
                <br />
                <hr />
                <br />

                <div>
                    here add bio
                    <br />
                    personalityType
                    <br />
                    LL giving (sliders)
                    <br />
                    LL recieving (sliders)
                    <br />
                    +link to view profile (share)
                </div>
            </div>
        </div>
    )
}

export default Profile;