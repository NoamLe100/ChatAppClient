import { useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';
import { getMessages, sendMessage } from '../api/messages';
import { MessageList } from './MessageList';
import { MessageInput } from './MessageInput';
import { getMyUserId } from '../api/auth';

type Message = {
  id: number;
  senderId: number;
  text: string;
  groupId: number;
};

type ChatWindowProps = {
  selectedChatId: number | null;
};

export function ChatWindow({ selectedChatId }: ChatWindowProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const myUserId = getMyUserId();

  const loadMessages = () => {
    if (!selectedChatId) return;
    getMessages(selectedChatId).then(data => setMessages(data));
  };

  useEffect(() => {
    loadMessages();
  }, [selectedChatId]);

  const handleSend = async (text: string) => {
    if (!selectedChatId) return;
    await sendMessage(selectedChatId, text);
    loadMessages();
  };

  if (!selectedChatId) {
    return (
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
        <Typography sx={{ color: '#8e9297' }}>Select a chat to start messaging</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <MessageList messages={messages} mySenderId={myUserId} />
      <MessageInput onSend={handleSend} />
    </Box>
  );
}