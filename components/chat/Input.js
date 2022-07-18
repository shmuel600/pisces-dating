import * as React from 'react';
import SendIcon from '@mui/icons-material/Send';
import AttachFileRoundedIcon from '@mui/icons-material/AttachFileRounded';
import PhotoCameraRoundedIcon from '@mui/icons-material/PhotoCameraRounded';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import { Fab, Paper, InputBase, IconButton, Box } from '@mui/material';

export default function Input({ onSend }) {
  const [input, setInput] = React.useState('');
  const handleSend = () => {
    onSend(input);
    setInput('');
  }
  return (
    <div style={{ display: 'flex', width: '100%' }}>
      <Fab variant='circular' color="primary" aria-label="add" size='medium'
        sx={{ mx: '2%', minWidth: '50px', minHeight: '50px', color: 'white', background: `rgb(25, 118, 210)` }}
      >
        <SendIcon onClick={() => { input.length > 0 && handleSend() }} />
      </Fab>
      <Paper
        component="form"
        sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: '100%', height: 50, borderRadius: 30, backgroundColor: 'rgb(40,40,40)' }}
      >
        <IconButton color="primary" sx={{ mx: 0.5, color: 'rgba(255,255,255, 0.7)' }} aria-label="directions">
          <EmojiEmotionsIcon />
        </IconButton>
        <Box sx={{ width: '90%' }}>
          <InputBase
            sx={{ ml: 0, flex: 1, color: 'rgba(255,255,255, 0.8)', minWidth: '100%' }}
            placeholder="Send Message"
            inputProps={{ 'aria-label': 'search google maps' }}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (input.length > 0 && e.key === 'Enter') {
                e.preventDefault();
                handleSend();
              }
            }}
          />
        </Box>
        <IconButton sx={{ p: '5px', color: 'rgba(255,255,255, 0.7)' }} aria-label="search">
          <AttachFileRoundedIcon sx={{ transform: 'rotate(45deg)' }} />
        </IconButton>
        <IconButton color="primary" sx={{ mr: 0.5, color: 'rgba(255,255,255, 0.7)' }} aria-label="directions">
          <PhotoCameraRoundedIcon />
        </IconButton>
      </Paper>
    </div>
  );
}