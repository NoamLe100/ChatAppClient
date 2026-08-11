import { Box, Typography, Avatar } from '@mui/material';

type MessageBubbleProps = {
  text: string;
  userId: number;
  isMine: boolean;
};

export function MessageBubble({ text, userId, isMine }: MessageBubbleProps) {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: isMine ? 'flex-end' : 'flex-start',
        alignItems: 'flex-end',
        gap: 1,
      }}
    >
      {!isMine && (
        <Avatar sx={{ width: 28, height: 28, fontSize: 14 }}>
          {userId.toString()[0]}
        </Avatar>
      )}
      <Box
        sx={{
          bgcolor: isMine ? '#5865f2' : '#404249',
          color: 'white',
          px: 1.5,
          py: 1,
          borderRadius: 2,
          maxWidth: '65%',
        }}
      >
        <Typography sx={{ fontSize: 14 }}>{text}</Typography>
      </Box>
    </Box>
  );
}