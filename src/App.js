import React from 'react';
import { Route, Routes } from 'react-router-dom';
import News from './components/pages/News';
import AuthenticationPage from './components/authentication/AuthenticationPage';
import Header from './components/Header';
import TopHeadlines from './components/pages/TopHeadlines';
import SearchResults from './components/pages/SearchResults';
import Finance from './components/pages/Finance';
import Sports from './components/pages/Sports';
import Business from './components/pages/Business';
import Arts from './components/pages/Art';
import { useAuth } from './components/authentication/AuthContext';
import Science from './components/pages/Science';
import Travel from './components/pages/Travel';
import Health from './components/pages/Health';
import Personalized from './components/pages/Personalized';

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
        <Route path="/science" element={<Science />} />
        <Route path="/health" element={<Health />} />
        <Route path="/arts" element={<Arts />} />
        <Route path="/travel" element={<Travel />} />
        <Route path="/search" element={<SearchResults />} />
        <Route path="/personalized" element={<Personalized />} />
        <Route path="/auth/*" element={<AuthenticationPage />} />
       

      </Routes>
    </div>
  );
}

export default App;
