import { useState } from 'react';
import { TextField, Button } from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { createChat } from '../../api/createChat';
import './CreateChat.css';

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
    <div className="create-chat-form">
      <TextField
        fullWidth
        size="small"
        className="name-field"
        placeholder="New chat name"
        value={newChatName}
        onChange={(e) => setNewChatName(e.target.value)}
        onKeyDown={(e) => { if (e.key === 'Enter') handleCreateChat(); }}
      />
      <Button
        fullWidth
        variant="contained"
        className="create-btn"
        startIcon={<AddCircleIcon />}
        onClick={handleCreateChat}
      >
        Create
      </Button>
    </div>
  );
}
