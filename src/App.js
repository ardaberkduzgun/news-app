import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import News from './components/News';
import AuthenticationPage from './components/AuthenticationPage';
import Header from './components/Header';
import TopHeadlines from './components/TopHeadlines';
import SearchResults from './components/SearchResults';
import Finance from './components/Finance';
import Sports from './components/Sports';
import Business from './components/Business';
import Arts from './components/Art';
import { useAuth } from './components/AuthContext';

function App() {

  const initializeLocalStorage = () => {

    const userData = localStorage.getItem('users');
    if (!userData) {
      const initialUsers = [
        { id: 1, username: 'user1', password: 'pas123.' },
        { id: 2, username: 'user2', password: 'pass322' },

      ];
      localStorage.setItem('users', JSON.stringify(initialUsers));
    };
  };


  initializeLocalStorage();

  const { isLoggedIn, login, logout } = useAuth();

  return (
    <div>
      <Header/>
      <Routes>
        <Route path="/" element={<News />} />
        <Route path="/top-headlines" element={<TopHeadlines />} />
        <Route path="/finance" element={<Finance />} />
        <Route path="/sports" element={<Sports />} />
        <Route path="/business" element={<Business />} />
        <Route path="/arts" element={<Arts />} />
        <Route path="/auth/*" element={<AuthenticationPage />} />
        <Route path="/search" element={<SearchResults />} />

      </Routes>
    </div>
  );
}

export default App;
