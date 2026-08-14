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
        <Avatar sx={{ width: 28, height: 28, fontSize: 13, bgcolor: '#57f287' }}>
          {userId.toString()[0]}
        </Avatar>
      )}
      <Box
        sx={{
          bgcolor: isMine ? '#5865f2' : '#404249',
          color: 'white',
          px: 1.75,
          py: 1,
          borderRadius: 3,
          borderBottomRightRadius: isMine ? 4 : 24,
          borderBottomLeftRadius: isMine ? 24 : 4,
          maxWidth: '65%',
          boxShadow: '0 1px 2px rgba(0,0,0,0.2)',
        }}
      >
        <Typography sx={{ fontSize: 14, wordBreak: 'break-word' }}>{text}</Typography>
      </Box>
    </Box>
  );
}