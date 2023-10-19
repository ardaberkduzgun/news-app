import React, { useState } from 'react';
import { Button, TextField } from '@mui/material';
import { authenticateUser } from './Authentication'; // Import your authentication function

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // Call the authenticateUser function with username and password
    const user = authenticateUser(username, password);
    if (user) {
      // Successful login logic (e.g., redirect to news page)
      console.log('Login successful');
    } else {
      // Handle login failure (e.g., show an error message)
      console.log('Login failed');
    }
  };

  return (
    <div>
      <h2>Login Page</h2>
      <TextField
        label="Username"
        variant="outlined"
        fullWidth
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <TextField
        label="Password"
        variant="outlined"
        type="password"
        fullWidth
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button variant="contained" color="primary" onClick={handleLogin}>
        Login
      </Button>
    </div>
  );
};

export default Login;
