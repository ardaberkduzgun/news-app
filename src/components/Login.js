import React, { useState } from 'react';
import { Button, TextField, Grid, Box } from '@mui/material';
import { authenticateUser } from './Authentication'; // Import your authentication function
import { useNavigate } from 'react-router-dom'; // Import useNavigate from react-router-dom
import { users } from '../data/mockData';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // Initialize useNavigate

  const [isLoggedIn, setIsLoggedIn] = useState(false);


  const handleLogin = () => {
    // Call the authenticateUser function with username and password
    const user = users.find((user) => user.username === username && user.password === password);
    if (user) {
      // Successful login logic (e.g., redirect to news page)
      console.log('Login successful');
      localStorage.setItem('username', username);
      console.log(username);
      setIsLoggedIn(true);
      navigate('/'); // Redirect to the home page
    } else {
      // Handle login failure (e.g., show an error message)
      console.log('Login failed');
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
