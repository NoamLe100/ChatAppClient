import { useState } from 'react';
import { Box, TextField, List, ListItemButton, ListItemAvatar, Avatar, ListItemText } from '@mui/material';
import { searchUsers, startPrivateChat } from '../api/chat';

type SearchResult = {
  id: number;
  userName: string;
  name: string | null;
};

type UserSearchProps = {
  onChatStarted: () => void;
};

export function UserSearch({ onChatStarted }: UserSearchProps) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);

  const handleQueryChange = async (value: string) => {
    setQuery(value);
    if (value.length < 2) {
      setResults([]);
      return;
    }
    const data = await searchUsers(value);
    setResults(data);
  };

  const handleSelectUser = async (userId: number) => {
    await startPrivateChat(userId);
    setQuery('');
    setResults([]);
    onChatStarted();
  };

  return (
    <Box sx={{ px: 2, py: 1.5, bgcolor: '#232428' }}>
      <TextField
        fullWidth
        size="small"
        placeholder="Search users..."
        value={query}
        onChange={(e) => handleQueryChange(e.target.value)}
        sx={{
          '& .MuiOutlinedInput-root': { bgcolor: '#1e1f22', color: 'white' },
        }}
      />

      {results.length > 0 && (
        <List sx={{ mt: 1 }}>
          {results.map((user) => (
            <ListItemButton
              key={user.id}
              onClick={() => handleSelectUser(user.id)}
              sx={{ borderRadius: 1, '&:hover': { bgcolor: '#35373c' } }}
            >
              <ListItemAvatar>
                <Avatar sx={{ bgcolor: '#5865f2', width: 28, height: 28, fontSize: 13 }}>
                  {user.userName[0].toUpperCase()}
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={user.userName}
                slotProps={{ primary: { sx: { color: 'white', fontSize: 14 } } }}
              />
            </ListItemButton>
          ))}
        </List>
      )}
    </Box>
  );
}