import { useState } from 'react';
import { TextField, IconButton } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import './MessageInput.css';

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
    <div className="message-input-wrap">
      <div className="message-input-bar">
        <TextField
          fullWidth
          multiline
          maxRows={4}
          variant="standard"
          placeholder="Message"
          className="message-input-field"
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              handleSend();
            }
          }}
          slotProps={{ input: { disableUnderline: true } }}
        />
        <IconButton onClick={handleSend} className={`message-input-send-btn ${text.trim() ? 'can-send' : 'cannot-send'}`}>
          <SendIcon />
        </IconButton>
      </div>
    </div>
  );
}
