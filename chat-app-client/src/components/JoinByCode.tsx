import { useState } from 'react';
import { Box, TextField, Button, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import LoginIcon from '@mui/icons-material/Login';
import { joinByCode } from '../api/chat';

type JoinByCodeFormProps = {
  onJoined: () => void;
};

export function JoinByCodeForm({ onJoined }: JoinByCodeFormProps) {
  const [code, setCode] = useState('');
  const [error, setError] = useState('');

  const handleJoin = async () => {
    if (!code.trim()) return;
    try {
      await joinByCode(code.toUpperCase());
      setCode('');
      onJoined();
    } catch (err) {
      setError('Invalid code or already a member.');
    }
  };

  return (
    <Box sx={{ px: 2, py: 1.5, bgcolor: '#232428' }}>
      <TextField
        fullWidth
        size="small"
        placeholder="Enter 5-character code"
        value={code}
        onChange={(e) => setCode(e.target.value)}
        onKeyDown={(e) => { if (e.key === 'Enter') handleJoin(); }}
        sx={{
          mb: 1,
          '& .MuiOutlinedInput-root': { bgcolor: '#1e1f22', color: 'white' },
        }}
      />
      <Button
        fullWidth
        variant="contained"
        startIcon={<LoginIcon />}
        onClick={handleJoin}
        sx={{ bgcolor: '#3ba55d', '&:hover': { bgcolor: '#2d7d46' } }}
      >
        Join
      </Button>

      <Dialog open={error !== ''} onClose={() => setError('')}>
        <DialogTitle sx={{ bgcolor: '#2b2d31', color: '#f23f42' }}>
          Join Failed
        </DialogTitle>
        <DialogContent sx={{ bgcolor: '#2b2d31', color: 'white', pt: 2 }}>
          {error}
        </DialogContent>
        <DialogActions sx={{ bgcolor: '#2b2d31' }}>
          <Button onClick={() => setError('')} sx={{ color: '#5865f2' }}>
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}