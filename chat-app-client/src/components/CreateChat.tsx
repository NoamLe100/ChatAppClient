import { useState } from 'react';
import { Box, TextField, Button } from '@mui/material';
import { createChat } from '../api/createChat';

type CreateChatFormProps = {
  onChatCreated: () => void;
};

export function CreateChatForm({ onChatCreated }: CreateChatFormProps) {
  const [newChatName, setNewChatName] = useState('');

  const handleCreateChat = async () => {
    await createChat(newChatName);
    setNewChatName('');
    onChatCreated();
  };

  return (
    <Box sx={{ p: 1 }}>
      <TextField
        fullWidth
        size="small"
        placeholder="New chat name"
        value={newChatName}
        onChange={(e) => setNewChatName(e.target.value)}
      />
      <Button fullWidth onClick={handleCreateChat} sx={{ mt: 1 }}>
        Create
      </Button>
    </Box>
  );
}