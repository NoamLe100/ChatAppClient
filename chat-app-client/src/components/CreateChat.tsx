import { useState } from 'react';
import { Box, TextField, Button } from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { createChat } from '../api/createChat';

type CreateChatFormProps = {
  onChatCreated: () => void;
};

export function CreateChatForm({ onChatCreated }: CreateChatFormProps) {
  const [newChatName, setNewChatName] = useState('');

  const handleCreateChat = async () => {
    if (!newChatName.trim()) return;
    await createChat(newChatName);
    setNewChatName('');
    onChatCreated();
  };

  return (
    <Box sx={{ px: 2, py: 1.5, bgcolor: '#232428' }}>
      <TextField
        fullWidth
        size="small"
        placeholder="New chat name"
        value={newChatName}
        onChange={(e) => setNewChatName(e.target.value)}
        onKeyDown={(e) => { if (e.key === 'Enter') handleCreateChat(); }}
        sx={{
          mb: 1,
          '& .MuiOutlinedInput-root': { bgcolor: '#1e1f22', color: 'white' },
        }}
      />
      <Button
        fullWidth
        variant="contained"
        startIcon={<AddCircleIcon />}
        onClick={handleCreateChat}
        sx={{ bgcolor: '#5865f2', '&:hover': { bgcolor: '#4752c4' } }}
      >
        Create
      </Button>
    </Box>
  );
}