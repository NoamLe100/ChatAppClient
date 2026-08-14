import { Box, Typography, List, ListItem, ListItemAvatar, Avatar, ListItemText, Chip } from '@mui/material';

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
    <Box>
      <Typography sx={{ color: 'white', fontWeight: 600, fontSize: 18, mb: 1 }}>
        {name || 'Unnamed group'}
      </Typography>

      {code && (
        <Chip
          label={`Code: ${code}`}
          sx={{ bgcolor: '#404249', color: 'white', mb: 2 }}
        />
      )}

      <Typography sx={{ color: '#949ba4', fontSize: 13, mb: 1, mt: 2 }}>
        {members.length} member{members.length !== 1 ? 's' : ''}
      </Typography>

      <List>
        {members.map((m) => (
          <ListItem key={m.user.id}>
            <ListItemAvatar>
              <Avatar sx={{ bgcolor: '#5865f2', width: 32, height: 32 }}>
                {m.user.userName[0].toUpperCase()}
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary={m.user.userName}
              slotProps={{ primary: { sx: { color: 'white' } } }}
            />
          </ListItem>
        ))}
      </List>
    </Box>
  );
}