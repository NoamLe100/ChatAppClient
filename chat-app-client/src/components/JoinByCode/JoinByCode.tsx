import { useState } from 'react';
import { TextField, Button, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import LoginIcon from '@mui/icons-material/Login';
import { joinByCode } from '../../api/chat';
import './JoinByCode.css';

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
    <div className="join-by-code-form">
      <TextField
        fullWidth
        size="small"
        className="code-field"
        placeholder="Enter 5-character code"
        value={code}
        onChange={(e) => setCode(e.target.value)}
        onKeyDown={(e) => { if (e.key === 'Enter') handleJoin(); }}
      />
      <Button
        fullWidth
        variant="contained"
        className="join-btn"
        startIcon={<LoginIcon />}
        onClick={handleJoin}
      >
        Join
      </Button>

      <Dialog open={error !== ''} onClose={() => setError('')}>
        <DialogTitle className="dialog-title">
          Join Failed
        </DialogTitle>
        <DialogContent className="dialog-content">
          {error}
        </DialogContent>
        <DialogActions className="dialog-actions">
          <Button onClick={() => setError('')} className="dialog-ok-btn">
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
