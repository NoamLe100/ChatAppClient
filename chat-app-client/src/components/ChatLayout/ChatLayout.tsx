import { useState } from 'react';
import { Box } from '@mui/material';
import { Sidebar } from '../Sidebar';
import { ChatWindow } from '../ChatWindow';

type Chat = {
  id: number;
  name: string | null;
  isGroup: boolean;
  pic: string | null;
  code: string | null;
};

export function ChatLayout() {
  const [selectedChat, setSelectedChat] = useState<Chat | null>(null);

  return (
    <Box sx={{ display: 'flex', height: '100vh', bgcolor: '#1e1f22' }}>
      <Box sx={{ width: 280, bgcolor: '#2b2d31', display: 'flex', flexDirection: 'column' }}>
        <Sidebar selectedChatId={selectedChat?.id ?? null} onSelectChat={setSelectedChat} />
      </Box>

      <Box sx={{ flex: 1, bgcolor: '#313338', display: 'flex', flexDirection: 'column' }}>
        <ChatWindow chat={selectedChat} />
      </Box>
    </Box>
  );
}