import { useState } from "react";
import { Box, Paper, TextField, Button, Typography, Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material";
import { useNavigate } from 'react-router-dom';
import { register } from '../api/auth';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function Register() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const registretion = async () => {
    if (!EMAIL_REGEX.test(email)) {
      setError('Please enter a valid email address.');
      return;
    }

    try {
      await register(email, password);
      navigate('/chat');
    }
    catch (err) {
      setError('Registration failed. Email may already be in use.');
    }
  }

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        bgcolor: '#313338',
      }}
    >
      <Paper
        sx={{
          width: 400,
          padding: 4,
          borderRadius: 2,
          bgcolor: '#2b2d31',
        }}
      >
        <Typography variant="h5" sx={{ color: 'white', mb: 2 }}>
          create a user
        </Typography>

        <TextField
          fullWidth
          type="email"
          label="mail"
          value={email}
          margin="normal"
          onChange={(e) => setEmail(e.target.value)}
        />

        <TextField
          fullWidth
          type="password"
          label="password"
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <Button fullWidth variant="contained" onClick={registretion} sx={{ mt: 2 }}>
          Register
        </Button>
      </Paper>

      <Dialog open={error !== ''} onClose={() => setError('')}>
        <DialogTitle sx={{ bgcolor: '#2b2d31', color: '#f23f42' }}>
          Registration Failed
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
  )
}