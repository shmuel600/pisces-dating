import * as React from 'react';
import SendIcon from '@mui/icons-material/Send';
import AttachFileRoundedIcon from '@mui/icons-material/AttachFileRounded';
import PhotoCameraRoundedIcon from '@mui/icons-material/PhotoCameraRounded';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import { Fab, Paper, InputBase, IconButton } from '@mui/material';

export default function ChatInput() {
  return (
    <div style={{ display: 'flex', width: '100%' }}>
      <Fab variant='circular' color="primary" aria-label="add" size='medium' sx={{ mx: '2%', minWidth: '50px', minHeight: '50px' }} >
        <SendIcon
        // sx={{ color: 'white' }}
        />
      </Fab>
      {/* <IconButton
        sx={{
          mx: 1, p: '10px', width: 50, height: 50,
          background: 'linear-gradient(45deg, rgb(86, 192, 224), rgb(11, 148, 190))'
        }}
        aria-label="menu"
      >
        <SendIcon />
      </IconButton> */}
      <Paper
        component="form"
        sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: '100%', height: 50, borderRadius: 30, backgroundColor: 'rgb(40,40,40)' }}
      >
        <IconButton color="primary" sx={{ mx: 0.5, color: 'rgba(255,255,255, 0.7)' }} aria-label="directions">
          <EmojiEmotionsIcon />
        </IconButton>
        <InputBase
          sx={{ ml: 0, flex: 1, color: 'rgba(255,255,255, 0.8)' }}
          placeholder="Send Message"
          inputProps={{ 'aria-label': 'search google maps' }}
        />
        {/* <span style={{ marginBottom: '6px', opacity: '30%', color: 'black' }}>|</span> */}
        <IconButton sx={{ p: '5px', color: 'rgba(255,255,255, 0.7)' }} aria-label="search">
          <AttachFileRoundedIcon sx={{ transform: 'rotate(45deg)' }} />
        </IconButton>
        <IconButton color="primary" sx={{ pr: '15px', color: 'rgba(255,255,255, 0.7)' }} aria-label="directions">
          <PhotoCameraRoundedIcon />
        </IconButton>
      </Paper>
    </div>
  );
}

{/* <IconButton type="submit" sx={{ p: '10px' }} aria-label="search">
        <SearchIcon />
      </IconButton> */}