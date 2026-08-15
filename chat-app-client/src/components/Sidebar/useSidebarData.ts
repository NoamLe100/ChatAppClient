import { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { getMyChats } from '../../api/chat';
import { logout } from '../../api/auth';
import { useAuth } from '../../hooks/useAuth';
import type { Chat } from '../../types';

export function useSidebarData() {
  const navigate = useNavigate();
  const { userId: myUserId } = useAuth();
  const [chats, setChats] = useState<Chat[]>([]);

  const loadChats = useCallback(() => {
    getMyChats().then(data => setChats(data));
  }, []);

  useEffect(() => {
    loadChats();
  }, [loadChats]);

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return { chats, myUserId, loadChats, handleLogout };
}
