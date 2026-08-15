import { useState } from 'react';
import { TextField, List, ListItemButton, ListItemAvatar, Avatar, ListItemText } from '@mui/material';
import { searchUsers, addMember } from '../../api/chat';
import './AddMemberSearch.css';

type SearchResult = {
  id: number;
  userName: string;
  name: string | null;
};

type AddMemberSearchProps = {
  chatId: number;
  onMemberAdded: () => void;
};

export function AddMemberSearch({ chatId, onMemberAdded }: AddMemberSearchProps) {
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
    try {
      await addMember(chatId, userId);
      setQuery('');
      setResults([]);
      onMemberAdded();
    } catch (err) {
      alert('Could not add member — they may already be in the group.');
    }
  };

  return (
    <div className="add-member-search">
      <TextField
        fullWidth
        size="small"
        className="search-field"
        placeholder="Search users to add..."
        value={query}
        onChange={(e) => handleQueryChange(e.target.value)}
      />

      {results.length > 0 && (
        <List className="results-list">
          {results.map((user) => (
            <ListItemButton
              key={user.id}
              className="result-item"
              onClick={() => handleSelectUser(user.id)}
            >
              <ListItemAvatar>
                <Avatar className="result-avatar">
                  {user.userName[0].toUpperCase()}
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={user.userName}
                slotProps={{ primary: { className: 'result-name' } }}
              />
            </ListItemButton>
          ))}
        </List>
      )}
    </div>
  );
}
