import { Typography, Avatar } from '@mui/material';
import './MessageBubble.css';

type MessageBubbleProps = {
  text: string;
  userId: number;
  senderName?: string;
  isMine: boolean;
};

export function MessageBubble({ text, userId, senderName, isMine }: MessageBubbleProps) {
  const displayName = senderName ?? `User ${userId}`;

  return (
    <div className={`message-bubble-row ${isMine ? 'is-mine' : 'is-theirs'}`}>
      {!isMine && (
        <Avatar className="message-bubble-avatar theirs">
          {displayName[0].toUpperCase()}
        </Avatar>
      )}

      <div className={`message-bubble-content ${isMine ? 'mine' : 'theirs'}`}>
        <Typography className="message-bubble-sender">
          {isMine ? 'me' : displayName}
        </Typography>
        <div className={`message-bubble ${isMine ? 'mine' : 'theirs'}`}>
          <Typography className="message-bubble-text">{text}</Typography>
        </div>
      </div>

      {isMine && (
        <Avatar className="message-bubble-avatar mine">
          {displayName[0].toUpperCase()}
        </Avatar>
      )}
    </div>
  );
}
