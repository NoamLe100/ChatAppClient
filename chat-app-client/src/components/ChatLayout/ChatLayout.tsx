import { useEffect, useState } from 'react';
import { Sidebar } from '../Sidebar/Sidebar';
import { ChatWindow } from '../ChatWindow/ChatWindow';
import { getMyChats } from '../../api/chat';
import { useSocket } from '../../hooks/useSocket';
import { useAuth } from '../../hooks/useAuth';
import { type Chat } from '../../types';
import './ChatLayout.css';

export function ChatLayout() {
  const { loading } = useAuth();
  const [selectedChat, setSelectedChat] = useState<Chat | null>(null);
  const socket = useSocket();

  useEffect(() => {
    if (!socket) return;

    getMyChats().then((chats: Chat[]) => {
      chats.forEach((chat) => {
        socket.emit('joinRoom', chat.id.toString());
      });
    });
  }, [socket]);

  if (loading) return null;

  return (
    <div className="chat-layout">
      <div className="chat-layout-sidebar">
        <Sidebar selectedChatId={selectedChat?.id ?? null} onSelectChat={setSelectedChat} />
      </div>

      <div className="chat-layout-main">
        <ChatWindow chat={selectedChat} />
      </div>
    </div>
  );
} 