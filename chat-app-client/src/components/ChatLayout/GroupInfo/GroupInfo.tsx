import { List, ListItem, ListItemAvatar, Avatar, ListItemText, Chip, Typography } from '@mui/material';
import './GroupInfo.css';

type Member = {
  user: {
    id: number;
    userName: string;
  };
};

type GroupInfoProps = {
  name: string | null;
  code: string | null;
  members: Member[];
};

export function GroupInfo({ name, code, members }: GroupInfoProps) {
  return (
    <div>
      <Typography className="group-info-name">
        {name || 'Unnamed group'}
      </Typography>

      {code && (
        <Chip
          label={`Code: ${code}`}
          className="group-info-code-chip"
        />
      )}

      <Typography className="group-info-member-count">
        {members.length} member{members.length !== 1 ? 's' : ''}
      </Typography>

      <List>
        {members.map((m) => (
          <ListItem key={m.user.id}>
            <ListItemAvatar>
              <Avatar className="group-info-avatar">
                {m.user.userName[0].toUpperCase()}
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary={m.user.userName}
              slotProps={{ primary: { className: 'group-info-member-name' } }}
            />
          </ListItem>
        ))}
      </List>
    </div>
  );
}
