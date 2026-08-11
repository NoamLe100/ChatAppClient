import { useState } from "react";
import { Box, Paper, TextField, Button, Typography } from "@mui/material";
import { useNavigate } from 'react-router-dom';
import { register, login } from '../api/auth';

export function Register() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const registretion = async () => {
    try {
      await register(email, password);
      const data = await login(email, password);
      localStorage.setItem('token', data.token);
      navigate('/chat');
    }
    catch(err) {
      alert('somting is worng');
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
    </Box>
  )
}