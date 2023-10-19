// Header.js
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, InputBase } from '@mui/material';

const Header = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate(); // Use useNavigate hook

  const handleSearch = () => {
    navigate(`/search?q=${searchTerm}`); // Use the navigate function to navigate
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Button component={Link} to="/" color="inherit" variant="text">
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            News App
          </Typography>
        </Button>
        <Button component={Link} to="/top-headlines" color="inherit" variant="text">
          Top Headlines
        </Button>
        <InputBase
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Button color="inherit" onClick={handleSearch}>
          Search
        </Button>

        <div>
          <Button color="inherit" component={Link} to="/auth/login">
            Login
          </Button>
          <Button color="inherit" component={Link} to="/auth/register">
            Register
          </Button>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
