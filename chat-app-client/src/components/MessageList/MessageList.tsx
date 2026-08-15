import { MessageBubble } from '../MessageBubble/MessageBubble';
import type { Message } from '../../types';
import './MessageList.css';

type MessageListProps = {
  messages: Message[];
  mySenderId: number | null;
  memberMap: Record<number, string>;
};

export function MessageList({ messages, mySenderId, memberMap }: MessageListProps) {
  return (
    <div className="message-list">
      {messages.map((msg) => (
        <MessageBubble
          key={msg.id}
          text={msg.text}
          userId={msg.senderId}
          senderName={memberMap[msg.senderId]}
          isMine={msg.senderId === mySenderId}
        />
      ))}
    </div>
  );
}
