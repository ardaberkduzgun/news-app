import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AppBar, Toolbar, Button, InputBase, IconButton, Grid } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import Box from '@mui/material/Box';
import PersonIcon from '@mui/icons-material/Person';
import HomeIcon from '@mui/icons-material/Home';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import { useAuth } from './authentication/AuthContext';


const Header = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const { isLoggedIn, login, logout } = useAuth();

  const handleSearch = () => {
    if (searchTerm.trim() !== '') {
      navigate(`/search?q=${searchTerm}`);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const handleLogout = () => {

    logout();
    navigate('/');
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
              <Grid>
                <Button component={Link} to="/top-headlines" color="inherit" variant="text">
                  Headlines
                </Button>
              </Grid>
              <Grid>
                <Button component={Link} to="/sports" color="inherit" variant="text">
                  Sports
                </Button>
                <Button component={Link} to="/business" color="inherit" variant="text">
                  Business
                </Button>
              </Grid>
              <Grid>
                <Button component={Link} to="/science" color="inherit" variant="text">
                  Science
                </Button>
                <Button component={Link} to="/health" color="inherit" variant="text">
                  Health
                </Button>
              </Grid>
              <Grid>
                <Button component={Link} to="/arts" color="inherit" variant="text">
                  Arts
                </Button>
                <Button component={Link} to="/travel" color="inherit" variant="text">
                  Travel
                </Button>
              </Grid>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
              <InputBase
                color="secondary"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyPress={handleKeyPress}
                sx={{ backgroundColor: "white", borderRadius: 2 }}
              />
              <IconButton color="inherit" onClick={handleSearch}>
                <SearchIcon >
                  Search
                </SearchIcon>
              </IconButton>
              {isLoggedIn ? (
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Button component={Link} to="/personalized" color="inherit" variant="text">
                    Personalized News
                  </Button>
                  <Button color="inherit">
                    <PersonIcon />
                    {localStorage.getItem('loggedInUserName')}
                  </Button>
                  <IconButton color="inherit" onClick={handleLogout}>
                    <LogoutRoundedIcon>
                      Logout
                    </LogoutRoundedIcon>
                  </IconButton>
                </Box>
              ) : (
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Button color="inherit" component={Link} to="/auth/login">
                    Login
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
