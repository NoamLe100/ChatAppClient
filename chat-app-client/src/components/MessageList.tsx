import { Box } from '@mui/material';
import { MessageBubble } from './MessageBubble';

type Message = {
  id: number;
  senderId: number;
  text: string;
  groupId: number;
};

type MessageListProps = {
  messages: Message[];
  mySenderId: number | null;
};

export function MessageList({ messages, mySenderId }: MessageListProps) {
  return (
    <Box sx={{ flex: 1, overflowY: 'auto', p: 2, display: 'flex', flexDirection: 'column', gap: 1.5 }}>
      {messages.map((msg) => (
        <MessageBubble
          key={msg.id}
          text={msg.text}
          userId={msg.senderId}
          isMine={msg.senderId === mySenderId}
        />
      ))}
    </Box>
  );
}