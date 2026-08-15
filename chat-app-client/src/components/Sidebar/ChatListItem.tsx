import { ListItemButton, ListItemAvatar, Avatar, ListItemText } from '@mui/material';
import { getChatLabel, getLastMessagePreview } from '../../utils/chatLabel';
import type { Chat } from '../../types';

const AVATAR_COLORS = ['#5865f2', '#57f287', '#fee75c', '#eb459e', '#ed4245', '#faa61a'] as const;

function colorForName(name: string): string {
  const index = name.charCodeAt(0) % AVATAR_COLORS.length;
  return AVATAR_COLORS[index];
}

type ChatListItemProps = {
  chat: Chat;
  myUserId: number | null;
  isSelected: boolean;
  onSelect: () => void;
};

export function ChatListItem({ chat, myUserId, isSelected, onSelect }: ChatListItemProps) {
  const label = getChatLabel(chat, myUserId);

  return (
    <ListItemButton selected={isSelected} onClick={onSelect} className="sidebar-chat-item">
      <ListItemAvatar>
        <Avatar style={{ backgroundColor: colorForName(label) }}>
          {label[0].toUpperCase()}
        </Avatar>
      </ListItemAvatar>
      <ListItemText
        primary={label}
        secondary={getLastMessagePreview(chat, myUserId) ?? (chat.code ? `Code: ${chat.code}` : undefined)}
        slotProps={{
          primary: { className: 'sidebar-chat-primary' },
          secondary: { className: 'sidebar-chat-secondary' },
        }}
      />
    </ListItemButton>
  );
}
