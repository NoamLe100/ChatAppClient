import { useEffect, useState } from 'react';
import {
  List, ListItemButton, ListItemAvatar, Avatar, ListItemText, Box,
  Typography, IconButton, Menu, MenuItem, ListItemIcon, Dialog, DialogTitle, DialogContent
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
import KeyIcon from '@mui/icons-material/VpnKey';
import ChatIcon from '@mui/icons-material/Forum';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import LogoutIcon from '@mui/icons-material/Logout';
import SettingsIcon from '@mui/icons-material/Settings';
import { getMyChats } from '../api/chat';
import { logout } from '../api/auth';
import { CreateChatForm } from './CreateChat';
import { JoinByCodeForm } from './JoinByCode';

type Chat = {
  id: number;
  name: string | null;
  isGroup: boolean;
  pic: string | null;
  code: string | null;
};

type SidebarProps = {
  selectedChatId: number | null;
  onSelectChat: (chat: Chat) => void;
};

const avatarColors = ['#5865f2', '#57f287', '#fee75c', '#eb459e', '#ed4245', '#faa61a'];

function colorForName(name: string) {
  const index = name.charCodeAt(0) % avatarColors.length;
  return avatarColors[index];
}

export function Sidebar({ selectedChatId, onSelectChat }: SidebarProps) {
  const navigate = useNavigate();
  const [chats, setChats] = useState<Chat[]>([]);
  const [menuAnchor, setMenuAnchor] = useState<null | HTMLElement>(null);
  const [settingsAnchor, setSettingsAnchor] = useState<null | HTMLElement>(null);
  const [dialogMode, setDialogMode] = useState<'create' | 'join' | null>(null);

  const loadChats = () => {
    getMyChats().then(data => setChats(data));
  };

  useEffect(() => {
    loadChats();
  }, []);

  const closeDialog = () => setDialogMode(null);

  const handleLogout = async () => {
    setSettingsAnchor(null);
    await logout();
    navigate('/login');
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
          onClick={(e) => setMenuAnchor(e.currentTarget)}
          sx={{ bgcolor: '#404249', '&:hover': { bgcolor: '#4b4e56' } }}
        >
          <AddIcon sx={{ color: 'white', fontSize: 20 }} />
        </IconButton>

        <Menu
          anchorEl={menuAnchor}
          open={Boolean(menuAnchor)}
          onClose={() => setMenuAnchor(null)}
          slotProps={{ paper: { sx: { bgcolor: '#2b2d31', color: 'white', minWidth: 180 } } }}
        >
          <MenuItem onClick={() => { setDialogMode('create'); setMenuAnchor(null); }}>
            <ListItemIcon><GroupAddIcon sx={{ color: '#b5bac1' }} /></ListItemIcon>
            Create a chat
          </MenuItem>
          <MenuItem onClick={() => { setDialogMode('join'); setMenuAnchor(null); }}>
            <ListItemIcon><KeyIcon sx={{ color: '#b5bac1' }} /></ListItemIcon>
            Join with code
          </MenuItem>
        </Menu>
      </Box>

      <List sx={{ flex: 1, overflowY: 'auto', px: 1 }}>
        {chats.length === 0 && (
          <Typography sx={{ color: '#80848e', textAlign: 'center', mt: 4, fontSize: 14 }}>
            No chats yet — tap + to create or join
          </Typography>
        )}

        {chats.map((chat) => {
          const label = chat.name || 'Unnamed chat';
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
          {dialogMode === 'create' ? 'Create a new chat' : 'Join a chat'}
        </DialogTitle>
        <DialogContent sx={{ bgcolor: '#313338', pt: 2 }}>
          {dialogMode === 'create' && (
            <CreateChatForm onChatCreated={() => { loadChats(); closeDialog(); }} />
          )}
          {dialogMode === 'join' && (
            <JoinByCodeForm onJoined={() => { loadChats(); closeDialog(); }} />
          )}
        </DialogContent>
      </Dialog>
    </Box>
  );
}