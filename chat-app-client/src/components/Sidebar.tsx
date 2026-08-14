import { useEffect, useState, useCallback } from 'react';
import {
  List, ListItemButton, ListItemAvatar, Avatar, ListItemText, Box,
  Typography, IconButton, Menu, MenuItem, ListItemIcon, Dialog, DialogTitle, DialogContent
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
import KeyIcon from '@mui/icons-material/VpnKey';
import ChatIcon from '@mui/icons-material/Forum';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import PersonSearchIcon from '@mui/icons-material/PersonSearch';
import LogoutIcon from '@mui/icons-material/Logout';
import SettingsIcon from '@mui/icons-material/Settings';
import { getMyChats } from '../api/chat';
import { getMe, logout } from '../api/auth';
import { CreateChatForm } from './CreateChat';
import { JoinByCodeForm } from './JoinByCode';
import { UserSearch } from './UserSearch';
import { getChatLabel, type Chat } from '../utils/chatLabel';

type DialogMode = 'create' | 'join' | 'search' | null;

type SidebarProps = {
  selectedChatId: number | null;
  onSelectChat: (chat: Chat) => void;
};

const AVATAR_COLORS = ['#5865f2', '#57f287', '#fee75c', '#eb459e', '#ed4245', '#faa61a'] as const;

function colorForName(name: string): string {
  const index = name.charCodeAt(0) % AVATAR_COLORS.length;
  return AVATAR_COLORS[index];
}

export function Sidebar({ selectedChatId, onSelectChat }: SidebarProps) {
  const navigate = useNavigate();
  const [chats, setChats] = useState<Chat[]>([]);
  const [myUserId, setMyUserId] = useState<number | null>(null);
  const [menuAnchor, setMenuAnchor] = useState<null | HTMLElement>(null);
  const [settingsAnchor, setSettingsAnchor] = useState<null | HTMLElement>(null);
  const [dialogMode, setDialogMode] = useState<DialogMode>(null);

  const loadChats = useCallback(() => {
    getMyChats().then(data => setChats(data));
  }, []);

  useEffect(() => {
    loadChats();
  }, [loadChats]);

  useEffect(() => {
    getMe().then(data => setMyUserId(data?.userId ?? null));
  }, []);

  const closeDialog = () => setDialogMode(null);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setMenuAnchor(event.currentTarget);
  };

  const handleMenuClose = () => setMenuAnchor(null);

  const openDialog = (mode: DialogMode) => {
    setDialogMode(mode);
    handleMenuClose();
  };

  const handleLogout = async () => {
    setSettingsAnchor(null);
    await logout();
    navigate('/login');
  };

  const handleActionCompleted = () => {
    loadChats();
    closeDialog();
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <Box sx={{
        px: 2, py: 1.5, display: 'flex', alignItems: 'center', gap: 1,
        borderBottom: '1px solid #1e1f22', boxShadow: '0 1px 0 rgba(0,0,0,0.2)'
      }}>
        <ChatIcon sx={{ color: '#949ba4' }} />
        <Typography sx={{ color: 'white', fontWeight: 600, flex: 1 }}>Your Chats</Typography>

        <IconButton
          size="small"
          onClick={handleMenuOpen}
          aria-label="Add or find a chat"
          sx={{ bgcolor: '#404249', '&:hover': { bgcolor: '#4b4e56' } }}
        >
          <AddIcon sx={{ color: 'white', fontSize: 20 }} />
        </IconButton>

        <Menu
          anchorEl={menuAnchor}
          open={Boolean(menuAnchor)}
          onClose={handleMenuClose}
          slotProps={{ paper: { sx: { bgcolor: '#2b2d31', color: 'white', minWidth: 180 } } }}
        >
          <MenuItem onClick={() => openDialog('create')}>
            <ListItemIcon><GroupAddIcon sx={{ color: '#b5bac1' }} /></ListItemIcon>
            Create a chat
          </MenuItem>
          <MenuItem onClick={() => openDialog('join')}>
            <ListItemIcon><KeyIcon sx={{ color: '#b5bac1' }} /></ListItemIcon>
            Join with code
          </MenuItem>
          <MenuItem onClick={() => openDialog('search')}>
            <ListItemIcon><PersonSearchIcon sx={{ color: '#b5bac1' }} /></ListItemIcon>
            Start a chat
          </MenuItem>
        </Menu>
      </Box>

      <List sx={{ flex: 1, overflowY: 'auto', px: 1 }}>
        {chats.length === 0 && (
          <Typography sx={{ color: '#80848e', textAlign: 'center', mt: 4, fontSize: 14 }}>
            No chats yet — tap + to create, join, or start one
          </Typography>
        )}

        {chats.map((chat) => {
          const label = getChatLabel(chat, myUserId);
          return (
            <ListItemButton
              key={chat.id}
              selected={chat.id === selectedChatId}
              onClick={() => onSelectChat(chat)}
              sx={{
                borderRadius: 1.5,
                mb: 0.5,
                '&.Mui-selected': { bgcolor: '#404249' },
                '&:hover': { bgcolor: '#35373c' },
              }}
            >
              <ListItemAvatar>
                <Avatar sx={{ bgcolor: colorForName(label) }}>
                  {label[0].toUpperCase()}
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={label}
                secondary={chat.code ? `Code: ${chat.code}` : undefined}
                slotProps={{
                  primary: { sx: { color: 'white', fontWeight: 500, fontSize: 15 } },
                  secondary: { sx: { color: '#949ba4', fontSize: 12 } },
                }}
              />
            </ListItemButton>
          );
        })}
      </List>

      <Box sx={{
        px: 2, py: 1.5, display: 'flex', alignItems: 'center',
        borderTop: '1px solid #1e1f22',
      }}>
        <IconButton
          size="small"
          onClick={(e) => setSettingsAnchor(e.currentTarget)}
          aria-label="Settings"
          sx={{ bgcolor: '#404249', '&:hover': { bgcolor: '#4b4e56' } }}
        >
          <SettingsIcon sx={{ color: 'white', fontSize: 20 }} />
        </IconButton>

        <Menu
          anchorEl={settingsAnchor}
          open={Boolean(settingsAnchor)}
          onClose={() => setSettingsAnchor(null)}
          anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
          transformOrigin={{ vertical: 'bottom', horizontal: 'left' }}
          slotProps={{ paper: { sx: { bgcolor: '#2b2d31', color: 'white', minWidth: 160 } } }}
        >
          <MenuItem onClick={handleLogout} sx={{ color: '#ed4245' }}>
            <ListItemIcon><LogoutIcon sx={{ color: '#ed4245' }} /></ListItemIcon>
            Log out
          </MenuItem>
        </Menu>
      </Box>

      <Dialog open={dialogMode !== null} onClose={closeDialog} fullWidth maxWidth="xs">
        <DialogTitle sx={{ bgcolor: '#313338', color: 'white' }}>
          {dialogMode === 'create' && 'Create a new chat'}
          {dialogMode === 'join' && 'Join a chat'}
          {dialogMode === 'search' && 'Start a chat'}
        </DialogTitle>
        <DialogContent sx={{ bgcolor: '#313338', pt: 2 }}>
          {dialogMode === 'create' && <CreateChatForm onChatCreated={handleActionCompleted} />}
          {dialogMode === 'join' && <JoinByCodeForm onJoined={handleActionCompleted} />}
          {dialogMode === 'search' && <UserSearch onChatStarted={handleActionCompleted} />}
        </DialogContent>
      </Dialog>
    </Box>
  );
}