import { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { getMyChats } from '../../api/chat';
import { logout } from '../../api/auth';
import { useAuth } from '../../context/AuthContext';
import { useSocketContext as useSocket } from '../../context/SocketContext';
import type { Chat } from '../../types';

export function useSidebarData() {
  const navigate = useNavigate();
  const { userId: myUserId, refresh } = useAuth();
  const socket = useSocket();
  const [chats, setChats] = useState<Chat[]>([]);

  const loadChats = useCallback(() => {
    getMyChats().then(data => setChats(data));
  }, []);

  useEffect(() => {
    loadChats();
  }, [loadChats]);

  useEffect(() => {
    if (!socket) return;
    socket.on('chatsUpdated', loadChats);
    return () => {
      socket.off('chatsUpdated', loadChats);
    };
  }, [socket, loadChats]);

  const handleLogout = async () => {
    await logout();
    await refresh();
    navigate('/login');
  };

  return { chats, myUserId, loadChats, handleLogout };
}