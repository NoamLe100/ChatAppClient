import { useState } from "react";
import { Box, Paper, TextField, Button, Typography, Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material";
import { useNavigate } from 'react-router-dom';
import { register, login } from '../../api/auth';
import { useAuth } from '../../hooks/useAuth';
import './Auth.css';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function Auth() {
  const navigate = useNavigate();
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const { refresh } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userName, setUserName] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async () => {
    if (mode === 'register' && !EMAIL_REGEX.test(email)) {
      setError('Please enter a valid email address.');
      return;
    }

    try {
      if (mode === 'register') {
        await register(email, password, userName);
      } else {
        await login(email, password);
      }
      await refresh();
      navigate('/chat');
    } catch (err) {
      setError(mode === 'register'
        ? 'Registration failed. Email or username may already be in use.'
        : 'Invalid email or password.');
    }
  };

  const toggleMode = () => {
    setMode(mode === 'login' ? 'register' : 'login');
    setError('');
  };

  return (
    <Box className="auth-page">
      <Paper className="auth-paper">
        <Typography variant="h5" className="auth-title">
          {mode === 'login' ? 'log in' : 'create a user'}
        </Typography>

        {mode === 'register' && (
          <TextField
            fullWidth
            label="username"
            value={userName}
            margin="normal"
            onChange={(e) => setUserName(e.target.value)}
          />
        )}

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

        <Button fullWidth variant="contained" onClick={handleSubmit} className="auth-submit-btn">
          {mode === 'login' ? 'Log in' : 'Register'}
        </Button>

        <Button fullWidth onClick={toggleMode} className="auth-toggle-btn">
          {mode === 'login' ? "Don't have an account? Register" : 'Already have an account? Log in'}
        </Button>
      </Paper>

      <Dialog open={error !== ''} onClose={() => setError('')}>
        <DialogTitle className="auth-dialog-title">
          {mode === 'login' ? 'Login Failed' : 'Registration Failed'}
        </DialogTitle>
        <DialogContent className="auth-dialog-content">
          {error}
        </DialogContent>
        <DialogActions className="auth-dialog-actions">
          <Button onClick={() => setError('')} className="auth-dialog-ok-btn">OK</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
