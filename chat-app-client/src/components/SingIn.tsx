import { useState } from "react";
import { Box, Paper, TextField, Button, Typography } from "@mui/material";
import { useNavigate } from 'react-router-dom';
import { login } from "../api/auth";

export function SignIn() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handelLogIn = async () => {
        try {
          const data = await login(email, password);
          localStorage.setItem('token', data.token);
          navigate('/chat');
        }
        catch(err) {
            alert('somting is worng')
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
            log in
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
              slotProps={{ htmlInput: { minLength: 6 } }}
            onChange={(e) => setPassword(e.target.value)}
          />

          <Button fullWidth variant="contained" onClick={handelLogIn} sx={{ mt: 2 }}>
            log in
          </Button>
        </Paper>
      </Box>
    )
}