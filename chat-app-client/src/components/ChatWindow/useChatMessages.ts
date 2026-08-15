import { useEffect, useRef, useState } from 'react';
import { getMessages } from '../../api/messages';
import { useSocketContext as useSocket } from '../../context/SocketContext';
import type { Message } from '../../types';

export function useChatMessages(selectedChatId: number | null) {
  const [messages, setMessages] = useState<Message[]>([]);
  const socket = useSocket();
  const joinedRef = useRef(false);
  const pendingRef = useRef<string[]>([]);

  useEffect(() => {
    if (!selectedChatId) {
      setMessages([]);
      return;
    }
    getMessages(selectedChatId).then(data => setMessages(data));
  }, [selectedChatId]);

  useEffect(() => {
    if (!selectedChatId || !socket) return;
    joinedRef.current = false;

    socket.emit('joinRoom', selectedChatId.toString(), (response: { success: boolean }) => {
      joinedRef.current = response?.success ?? false;
      if (joinedRef.current) {
        pendingRef.current.forEach(text => {
          socket.emit('message', { roomId: `room_${selectedChatId}`, text });
        });
        pendingRef.current = [];
      }
    });
  }, [selectedChatId, socket]);

  useEffect(() => {
    if (!socket) return;
    const handleIncoming = (newMessage: Message) => {
      setMessages(prev => [...prev, newMessage]);
    };
    socket.on('message', handleIncoming);
    return () => {
      socket.off('message', handleIncoming);
    };
  }, [socket]);

  const sendMessage = (text: string) => {
    if (!selectedChatId || !socket) return;
    if (!joinedRef.current) {
      pendingRef.current.push(text);
      return;
    }
    socket.emit('message', { roomId: `room_${selectedChatId}`, text });
  };

  return { messages, sendMessage };
}