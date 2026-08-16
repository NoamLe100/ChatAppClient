import { useEffect, useState } from 'react';
import { getMessages } from '../../api/messages';
import { useSocketContext as useSocket } from '../../context/SocketContext';
import type { Message } from '../../types';

export function useChatMessages(selectedChatId: number | null) {
  const [messages, setMessages] = useState<Message[]>([]);
  const socket = useSocket();

  useEffect(() => {
    if (!selectedChatId) {
      setMessages([]);
      return;
    }
    getMessages(selectedChatId).then(data => setMessages(data));
  }, [selectedChatId]);

  useEffect(() => {
    if (!selectedChatId || !socket) return;
    socket.emit('joinRoom', selectedChatId.toString());
  }, [selectedChatId, socket]);

  useEffect(() => {
    if (!socket || !selectedChatId) return;
    const handleIncoming = (newMessage: Message) => {
      if (newMessage.groupId !== selectedChatId) return;
      setMessages(prev => [...prev, newMessage]);
    };
    socket.on('message', handleIncoming);
    return () => {
      socket.off('message', handleIncoming);
    };
  }, [socket, selectedChatId]);

  const sendMessage = (text: string) => {
    if (!selectedChatId || !socket) return;
    socket.emit('message', { roomId: `room_${selectedChatId}`, text });
  };

  return { messages, sendMessage };
}