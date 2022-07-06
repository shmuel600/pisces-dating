import Bio from '@mui/icons-material/InfoOutlined';
import TextArea from '@mui/material/TextareaAutosize';
import { Box } from '@mui/material';
import Context from '../../contexts/Context';
// import Fab from '@mui/material/Fab';
// import Edit from '@mui/icons-material/EditRounded';
import * as React from 'react';

export default function About() {
    const { user, userId } = React.useContext(Context);
    const updateBio = (value) => {
        user.bio = value;
        fetch(`/api/user/${userId}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ bio: user.bio })
        });
    }
    // const [bioEdit, setBioEdit] = React.useState(false);
    // const bio = React.useRef();
    // const focusBio = () => {
    //     setBioEdit(true);
    //     bio.current.focus();
    // };

    return (
        <>
            <Box sx={{ display: 'flex' }}>
                <Box sx={{ left: 0, display: 'flex', flexDirection: 'column', mt: -1, mx: 2 }}>
                    <label>About Me</label>
                </Box>
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <Box sx={{ position: 'absolute', left: 0, display: 'flex', flexDirection: 'column', mt: -1, mx: 2 }}>
                    <Bio sx={{ color: 'gray', width: 30, height: 30, mt: -2.5 }} />
                </Box>
                <Box sx={{ p: 1 }}>
                    <TextArea
                        // ref={bio}
                        // disabled={!bioEdit}
                        onBlur={(e) => updateBio(e.target.value)}
                        sx={{ border: '0px solid transparent' }}
                        minRows={3}
                        maxRows={6}
                        defaultValue={user.bio}
                        placeholder="About me..."
                        style={{ width: 280, height: 120 }}
                    />
                </Box>
                {/* <Fab size='small' sx={{ backgroundColor: 'transparent !important', boxShadow: '0', position: 'absolute', right: 0, mx: 2 }}>
                    <Edit sx={{ color: 'rgb(144,202,249)' }} onClick={() => focusBio()} />
                </Fab> */}
            </Box>
        </>
    )
}