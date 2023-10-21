// Header.js
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, InputBase, IconButton, Stack,Grid  } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import Box from '@mui/material/Box';
import { isAuthenticated, logoutUser } from './Authentication'; // Import authentication functions
import PersonIcon from '@mui/icons-material/Person'; // Import PersonIcon
import HomeIcon from '@mui/icons-material/Home';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';


const Header = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate(); // Use useNavigate hook
  const isLoggedIn = isAuthenticated();

  const handleSearch = () => {
    navigate(`/search?q=${searchTerm}`); // Use the navigate function to navigate
  };

  const handleLogout = () => {
    logoutUser(); // Call the logout function
    navigate('/'); // Redirect to the home page after logout
  };

  return (
    
<AppBar position="static">
  <Toolbar>
    <Grid container alignItems="center" justifyContent="space-between">
      <Grid item xs={12} sm={6}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <IconButton component={Link} to="/" color="inherit">
            <HomeIcon />
          </IconButton>
          <Button component={Link} to="/top-headlines" color="inherit" variant="text">
            Headlines
          </Button>
          <Button component={Link} to="/finance" color="inherit" variant="text">
            Finance
          </Button>
          <Button component={Link} to="/sports" color="inherit" variant="text">
            Sports
          </Button>
          <Button component={Link} to="/top-headlines" color="inherit" variant="text">
            Business
          </Button>
        </Box>
      </Grid>
      <Grid item xs={12} sm={6}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
          <InputBase
            color="secondary"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            sx={{ backgroundColor: "white", borderRadius: 2 }}
          />
          <SearchIcon onClick={handleSearch}>
            Search
          </SearchIcon>
          {isLoggedIn ? (
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Button color="inherit">
                <PersonIcon /> {localStorage.getItem('username')}
              </Button>
              <Button color="inherit" onClick={handleLogout}>
                Logout
              </Button>
            </Box>
          ) : (
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Button color="inherit" component={Link} to="/auth/login">
                Login
              </Button>
              <Button color="inherit" component={Link} to="/auth/register">
                Register
              </Button>
            </Box>
          )}
        </Box>
      </Grid>
    </Grid>
  </Toolbar>
</AppBar>
  );
};

export default Header;
