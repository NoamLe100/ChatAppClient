import { useEffect, useState } from 'react';
import { Box, Typography, Avatar, IconButton, Dialog, DialogTitle, DialogContent } from '@mui/material';
import ForumIcon from '@mui/icons-material/Forum';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import { getMessages } from '../api/messages';
import { getChatDetails } from '../api/chat';
import { MessageList } from './MessageList';
import { MessageInput } from './MessageInput';
import { getMe } from '../api/auth';
import { useSocket } from '../hooks/useSocket';
import { getChatLabel, type Chat } from '../utils/chatLabel';
import { AddMemberSearch } from './AddMemberSearch';
import { GroupInfo } from './GroupInfo';

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
  const [addMemberOpen, setAddMemberOpen] = useState(false);
  const [infoOpen, setInfoOpen] = useState(false);
  const [chatDetails, setChatDetails] = useState<Chat | null>(null);
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

  const handleOpenInfo = async () => {
    if (!selectedChatId) return;
    const data = await getChatDetails(selectedChatId);
    setChatDetails(data);
    setInfoOpen(true);
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
        <Box
          onClick={handleOpenInfo}
          sx={{ display: 'flex', alignItems: 'center', gap: 1.5, flex: 1, cursor: 'pointer', borderRadius: 1, px: 1, py: 0.5, '&:hover': { bgcolor: '#35373c' } }}
        >
          <Avatar sx={{ width: 32, height: 32, bgcolor: '#5865f2', fontSize: 14 }}>
            {label[0].toUpperCase()}
          </Avatar>
          <Typography sx={{ color: 'white', fontWeight: 600 }}>{label}</Typography>
        </Box>

        {chat.isGroup && (
          <IconButton
            size="small"
            onClick={() => setAddMemberOpen(true)}
            aria-label="Add member"
            sx={{ bgcolor: '#404249', '&:hover': { bgcolor: '#4b4e56' } }}
          >
            <PersonAddIcon sx={{ color: 'white', fontSize: 20 }} />
          </IconButton>
        )}
      </Box>

      <MessageList messages={messages} mySenderId={myUserId} />
      <MessageInput onSend={handleSend} />

      <Dialog open={addMemberOpen} onClose={() => setAddMemberOpen(false)} fullWidth maxWidth="xs">
        <DialogTitle sx={{ bgcolor: '#313338', color: 'white' }}>
          Add member to {label}
        </DialogTitle>
        <DialogContent sx={{ bgcolor: '#313338', pt: 2 }}>
          <AddMemberSearch
            chatId={chat.id}
            onMemberAdded={() => setAddMemberOpen(false)}
          />
        </DialogContent>
      </Dialog>

      <Dialog open={infoOpen} onClose={() => setInfoOpen(false)} fullWidth maxWidth="xs">
        <DialogTitle sx={{ bgcolor: '#313338', color: 'white' }}>
          Group Info
        </DialogTitle>
        <DialogContent sx={{ bgcolor: '#313338', pt: 2 }}>
          {chatDetails && (
            <GroupInfo
              name={chatDetails.name}
              code={chatDetails.code}
              members={chatDetails.members}
            />
          )}
        </DialogContent>
      </Dialog>
    </Box>
  );
}