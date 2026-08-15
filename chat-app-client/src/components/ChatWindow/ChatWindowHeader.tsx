import { Avatar, IconButton } from '@mui/material';
import PersonAddIcon from '@mui/icons-material/PersonAdd';

type ChatWindowHeaderProps = {
  label: string;
  isGroup: boolean;
  onOpenInfo: () => void;
  onOpenAddMember: () => void;
};

export function ChatWindowHeader({ label, isGroup, onOpenInfo, onOpenAddMember }: ChatWindowHeaderProps) {
  return (
    <div className="chat-window-header">
      <div className="chat-window-header-info" onClick={onOpenInfo}>
        <Avatar className="chat-window-header-avatar">
          {label[0].toUpperCase()}
        </Avatar>
        <p className="chat-window-header-title">{label}</p>
      </div>

      {isGroup && (
        <IconButton
          size="small"
          onClick={onOpenAddMember}
          aria-label="Add member"
          className="chat-window-add-member-btn"
        >
          <PersonAddIcon className="chat-window-add-member-icon" />
        </IconButton>
      )}
    </div>
  );
}
