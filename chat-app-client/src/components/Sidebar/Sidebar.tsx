import { useState } from 'react';
import { List, IconButton, Menu, MenuItem, ListItemIcon } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import KeyIcon from '@mui/icons-material/VpnKey';
import ChatIcon from '@mui/icons-material/Forum';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import PersonSearchIcon from '@mui/icons-material/PersonSearch';
import LogoutIcon from '@mui/icons-material/Logout';
import SettingsIcon from '@mui/icons-material/Settings';
import EditIcon from '@mui/icons-material/Edit';
import { useSidebarData } from './useSidebarData';
import { ChatListItem } from './ChatListItem';
import { SidebarDialogs } from './SidebarDialogs';
import type { Chat } from '../../types';
import './Sidebar.css';

type DialogMode = 'create' | 'join' | 'search' | null;

type SidebarProps = {
  selectedChatId: number | null;
  onSelectChat: (chat: Chat) => void;
};

export function Sidebar({ selectedChatId, onSelectChat }: SidebarProps) {
  const { chats, myUserId, loadChats, handleLogout } = useSidebarData();
  const [menuAnchor, setMenuAnchor] = useState<null | HTMLElement>(null);
  const [settingsAnchor, setSettingsAnchor] = useState<null | HTMLElement>(null);
  const [dialogMode, setDialogMode] = useState<DialogMode>(null);
  const [editBioOpen, setEditBioOpen] = useState(false);

  const openDialog = (mode: DialogMode) => {
    setDialogMode(mode);
    setMenuAnchor(null);
  };

  const handleActionCompleted = () => {
    loadChats();
    setDialogMode(null);
  };

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <ChatIcon className="sidebar-header-icon" />
        <p className="sidebar-header-title">Your Chats</p>

        <IconButton size="small" onClick={(e) => setMenuAnchor(e.currentTarget)} className="sidebar-add-btn">
          <AddIcon className="sidebar-add-icon" />
        </IconButton>

        <Menu anchorEl={menuAnchor} open={Boolean(menuAnchor)} onClose={() => setMenuAnchor(null)} slotProps={{ paper: { className: 'sidebar-menu-paper' } }}>
          <MenuItem onClick={() => openDialog('create')}>
            <ListItemIcon><GroupAddIcon className="sidebar-menu-icon" /></ListItemIcon>Create a chat
          </MenuItem>
          <MenuItem onClick={() => openDialog('join')}>
            <ListItemIcon><KeyIcon className="sidebar-menu-icon" /></ListItemIcon>Join with code
          </MenuItem>
          <MenuItem onClick={() => openDialog('search')}>
            <ListItemIcon><PersonSearchIcon className="sidebar-menu-icon" /></ListItemIcon>Start a chat
          </MenuItem>
        </Menu>
      </div>

      <List className="sidebar-list">
        {chats.length === 0 && <p className="sidebar-empty-text">No chats yet — tap + to create, join, or start one</p>}
        {chats.map((chat) => (
          <ChatListItem
            key={chat.id}
            chat={chat}
            myUserId={myUserId}
            isSelected={chat.id === selectedChatId}
            onSelect={() => onSelectChat(chat)}
          />
        ))}
      </List>

      <div className="sidebar-footer">
        <IconButton size="small" onClick={(e) => setSettingsAnchor(e.currentTarget)} className="sidebar-settings-btn">
          <SettingsIcon className="sidebar-settings-icon" />
        </IconButton>

        <Menu
          anchorEl={settingsAnchor}
          open={Boolean(settingsAnchor)}
          onClose={() => setSettingsAnchor(null)}
          anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
          transformOrigin={{ vertical: 'bottom', horizontal: 'left' }}
          slotProps={{ paper: { className: 'sidebar-settings-menu-paper' } }}
        >
          <MenuItem onClick={() => { setSettingsAnchor(null); setEditBioOpen(true); }}>
            <ListItemIcon><EditIcon className="sidebar-menu-icon" /></ListItemIcon>Edit Bio
          </MenuItem>
          <MenuItem onClick={handleLogout} className="sidebar-logout-item">
            <ListItemIcon><LogoutIcon className="sidebar-logout-icon" /></ListItemIcon>Log out
          </MenuItem>
        </Menu>
      </div>

      <SidebarDialogs
        dialogMode={dialogMode}
        onCloseDialog={() => setDialogMode(null)}
        onActionCompleted={handleActionCompleted}
        editBioOpen={editBioOpen}
        onCloseEditBio={() => setEditBioOpen(false)}
      />
    </div>
  );
}
