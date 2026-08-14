import { useState } from 'react';
import { Box, TextField, IconButton } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';

type MessageInputProps = {
  onSend: (text: string) => void;
};

export function MessageInput({ onSend }: MessageInputProps) {
  const [text, setText] = useState('');

  const handleSend = () => {
    if (!text.trim()) return;
    onSend(text);
    setText('');
  };

  return (
    <Box sx={{ p: 2, borderTop: '1px solid #26282c' }}>
      <Box sx={{
        display: 'flex', alignItems: 'center', gap: 1,
        bgcolor: '#383a40', borderRadius: 3, px: 1.5, py: 0.5,
      }}>
        <TextField
          fullWidth
          multiline
          maxRows={4}
          variant="standard"
          placeholder="Message"
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              handleSend();
            }
          }}
          slotProps={{ input: { disableUnderline: true } }}
          sx={{ '& .MuiInputBase-input': { color: 'white', py: 1 } }}
        />
        <IconButton onClick={handleSend} sx={{ color: text.trim() ? '#5865f2' : '#4e5058' }}>
          <SendIcon />
        </IconButton>
      </Box>
    </Box>
  );
}