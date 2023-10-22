import React, { useState } from 'react';
import { Button, TextField, Grid, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';


const Login = () => {
  const [username, setUsername] = useState('user1');
  const [password, setPassword] = useState('pas123.');
  const navigate = useNavigate();

  const { isLoggedIn, login, logout } = useAuth();


  const handleLogin = () => {
    
    const users = JSON.parse(localStorage.getItem('users')) || [];

    const user = users.find((user) => user.username === username && user.password === password);
    if (user) {
      console.log('Login successful');
      navigate('/'); 
      login(username);
      
    } else {
      window.alert('Login failed. Please check your username and password.');
      localStorage.setItem('isLoggedIn',false);
      logout();
    }
  };

  return (
    <Box sx={{ paddingLeft: 2 }}>
      <h2>Login Page</h2>

      <Grid container>
        <Grid item xs={12} sm={12} md={12} lg={12}
          sx={{ paddingTop: 1 }} >
          <TextField
            label="Username"
            variant="outlined"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={12}
          sx={{ paddingTop: 1 }}>
          <TextField
            label="Password"
            variant="outlined"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={12}
          sx={{ paddingTop: 1 }}>
          <Button variant="contained" color="primary" onClick={handleLogin}>
            Login
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Login;
