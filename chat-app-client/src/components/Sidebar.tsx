import { useEffect, useState } from 'react';
import { List, ListItemButton, ListItemAvatar, Avatar, ListItemText, Box } from '@mui/material';
import { getMyChats } from '../api/chat';
import { CreateChatForm } from './CreateChat';


type Chat = {
  id: number;
  name: string | null;
  isGroup: boolean;
  pic: string | null;
};

type SidebarProps = {
  selectedChatId: number | null;
  onSelectChat: (id: number) => void;
};

export function Sidebar({ selectedChatId, onSelectChat }: SidebarProps) {
  const [chats, setChats] = useState<Chat[]>([]);

  const loadChats = () => {
    getMyChats().then(data => setChats(data));
  };

  useEffect(() => {
    loadChats();
  }, []);

  return (
    <Box>
      <CreateChatForm onChatCreated={loadChats} />

      <List>
        {chats.map((chat) => (
          <ListItemButton
            key={chat.id}
            selected={chat.id === selectedChatId}
            onClick={() => onSelectChat(chat.id)}
          >
            <ListItemAvatar>
              <Avatar>{chat.name ? chat.name[0] : '?'}</Avatar>
            </ListItemAvatar>
            <ListItemText primary={chat.name || 'Unnamed chat'} sx={{ color: 'white' }} />
          </ListItemButton>
        ))}
      </List>
    </Box>
  );
}