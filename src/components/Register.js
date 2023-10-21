import React, { useState } from 'react';
import { Button, TextField } from '@mui/material';
import { registerUser } from './Authentication'; // Import your registration function

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = () => {
    // Call the registerUser function with username and password
    const newUser = registerUser(username, password);
    if (newUser) {
      // Successful registration logic (e.g., show a success message)
      console.log('Registration successful');
    } else {
      // Handle registration failure (e.g., show an error message)
      console.log('Registration failed');
    }
  };

  return (
    <div>
      <h2>Register Page</h2>
      <TextField
        label="Username"
        variant="outlined"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <TextField
        label="Password"
        variant="outlined"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button variant="contained" color="primary" onClick={handleRegister}>
        Register
      </Button>
    </div>
  );
};

export default Register;
