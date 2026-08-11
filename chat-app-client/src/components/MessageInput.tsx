import { useState } from 'react';
import { Box, TextField, Button } from '@mui/material';

type MessageInputProps = {
  onSend: (text: string) => void;
};

export function MessageInput({ onSend }: MessageInputProps) {
  const [text, setText] = useState('');

  const handleSend = () => {
    if (!text) return;
    onSend(text);
    setText('');
  };

  return (
    <Box sx={{ p: 2, borderTop: '1px solid #26282c' }}>
      <Box sx={{ display: 'flex', gap: 1 }}>
        <TextField
          fullWidth
          size="small"
          placeholder="Message"
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => { if (e.key === 'Enter') handleSend(); }}
        />
        <Button variant="contained" onClick={handleSend}>Send</Button>
      </Box>
    </Box>
  );
}