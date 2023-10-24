import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button, TextField, Select, MenuItem, FormControl, InputLabel, Grid } from '@mui/material';
import { registerUser } from './Authentication';
import { useAuth } from './AuthContext';


const Register = () => {
  const [username, setUsername] = useState('searcher');
  const [password, setPassword] = useState('1234');
  const [name, setName] = useState('anil');
  const [surname, setSurname] = useState('duzgun');
  const [interests, setInterests] = useState([]);
  const [email, setEmail] = useState('aa@bb.com');

  const [nameError, setNameError] = useState(false);
  const [surnameError, setSurnameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [usernameError, setUsernameError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const navigate = useNavigate();

  const { isLoggedIn, login, logout } = useAuth();

  const handleRegister = () => {

    if (!name || !surname || !email || !username || !password) {
      setNameError(!name);
      setSurnameError(!surname);
      setEmailError(!email);
      setUsernameError(!username);
      setPasswordError(!password);
      return;
    }

    const existingUsers = JSON.parse(localStorage.getItem('users')) || [];

    const isUsernameTaken = existingUsers.some((user) => user.username === username);
    debugger;
    if (isUsernameTaken) {
      setUsernameError(true);
      window.alert('Username already taken, please try another username.');
      logout();
      return;
    }
    else{

    setUsernameError(false);

    const newUser = registerUser(username, password, name, surname, interests, email);
    if (newUser) {
      navigate('/personalized');
      login(username);
    } else {
      logout();
    }
    }
  };

  const selectStyle = {
    width: '23%',
  };

  return (
    <Box sx={{ paddingLeft: 2 }}>
      <h2>Register Page</h2>
      <Grid container>
        <Grid item xs={12} sm={12} md={12} lg={12}
          sx={{ paddingTop: 1 }} >
          <TextField
            label="Name"
            variant="outlined"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            error={nameError}
            helperText={nameError ? 'Name is required' : ''}
          />
          <TextField sx={{ paddingLeft: 1 }}
            label="Surname"
            variant="outlined"
            value={surname}
            onChange={(e) => setSurname(e.target.value)}
            required
            error={surnameError}
            helperText={surnameError ? 'Surname is required' : ''}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={12}
          sx={{ paddingTop: 1 }} >
          <TextField
            label="Email"
            variant="outlined"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            error={emailError}
            helperText={emailError ? 'Email is required' : ''}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={12}
          sx={{ paddingTop: 1 }} >
          <TextField
            label="Username"
            variant="outlined"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            error={usernameError}
            helperText={usernameError ? 'Username is required' : ''}
          />
          <TextField sx={{ paddingLeft: 1 }}
            label="Password"
            variant="outlined"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            error={passwordError}
            helperText={passwordError ? 'Password is required' : ''}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={12}
          sx={{ paddingTop: 1 }} >
          <FormControl variant="outlined" style={selectStyle}>
            <InputLabel>Interests</InputLabel>
            <Select
              value={interests}
              onChange={(e) => setInterests(e.target.value)}
              label="Interests"
              multiple
              renderValue={(selected) => selected.join(', ')}
            >
              <MenuItem value="business">Business</MenuItem>
              <MenuItem value="sports">Sports</MenuItem>
              <MenuItem value="finance">Finance</MenuItem>
              <MenuItem value="finance">Health</MenuItem>
              <MenuItem value="finance">Art</MenuItem>
              <MenuItem value="finance">Travel</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item sx={{ paddingTop: 1 }}>
          <Button variant="contained" color="primary" onClick={handleRegister}>
            Register
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Register;
