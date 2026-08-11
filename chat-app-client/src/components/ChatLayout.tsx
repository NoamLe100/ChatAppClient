import { useState } from 'react';
import { Box } from '@mui/material';
import { Sidebar } from './Sidebar';
import { ChatWindow } from './ChatWindow';

export function ChatLayout() {
  const [selectedChatId, setSelectedChatId] = useState<number | null>(null);

  return (
    <Box sx={{ display: 'flex', height: '100vh' }}>
      <Box sx={{ width: 240, bgcolor: '#2b2d31' }}>
        <Sidebar selectedChatId={selectedChatId} onSelectChat={setSelectedChatId} />
      </Box>

      <Box sx={{ flex: 1, bgcolor: '#313338' }}>
        <ChatWindow selectedChatId={selectedChatId} />
      </Box>
    </Box>
  );
}