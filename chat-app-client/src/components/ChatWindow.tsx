import { useEffect, useState } from 'react';
import { Box, Typography, Avatar } from '@mui/material';
import ForumIcon from '@mui/icons-material/Forum';
import { getMessages } from '../api/messages';
import { MessageList } from './MessageList';
import { MessageInput } from './MessageInput';
import { getMe } from '../api/auth';
import { useSocket } from '../hooks/useSocket';
import { getChatLabel, type Chat } from '../utils/chatLabel';

type Message = {
  id: number;
  senderId: number;
  text: string;
  groupId: number;
};

type ChatWindowProps = {
  chat: Chat | null;
};

export function ChatWindow({ chat }: ChatWindowProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [myUserId, setMyUserId] = useState<number | null>(null);
  const socket = useSocket();
  const selectedChatId = chat?.id ?? null;

  useEffect(() => {
    getMe().then(data => setMyUserId(data?.userId ?? null));
  }, []);

  const loadMessages = () => {
    if (!selectedChatId) return;
    getMessages(selectedChatId).then(data => setMessages(data));
  };

  useEffect(() => {
    loadMessages();
  }, [selectedChatId]);

  useEffect(() => {
    if (!selectedChatId || !socket) return;
    socket.emit('joinRoom', selectedChatId.toString());
  }, [selectedChatId, socket]);

  useEffect(() => {
    if (!socket) return;
    socket.on('message', (newMessage: Message) => {
      setMessages((prev) => [...prev, newMessage]);
    });
    return () => {
      socket.off('message');
    };
  }, [socket]);

  const handleSend = (text: string) => {
    if (!selectedChatId || !socket) return;
    const roomId = `room_${selectedChatId}`;
    socket.emit('message', { roomId, text });
  };

  if (!chat) {
    return (
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', gap: 2 }}>
        <ForumIcon sx={{ fontSize: 64, color: '#404249' }} />
        <Typography sx={{ color: '#80848e' }}>Select a chat to start messaging</Typography>
      </Box>
    );
  }

  const label = getChatLabel(chat, myUserId);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <Box sx={{
        px: 2, py: 1.5, display: 'flex', alignItems: 'center', gap: 1.5,
        borderBottom: '1px solid #26282c', boxShadow: '0 1px 0 rgba(0,0,0,0.2)'
      }}>
        <Avatar sx={{ width: 32, height: 32, bgcolor: '#5865f2', fontSize: 14 }}>
          {label[0].toUpperCase()}
        </Avatar>
        <Typography sx={{ color: 'white', fontWeight: 600 }}>{label}</Typography>
      </Box>

      <MessageList messages={messages} mySenderId={myUserId} />
      <MessageInput onSend={handleSend} />
    </Box>
  );
}