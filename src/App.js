import React from 'react';
import { Route, Routes } from 'react-router-dom';
import News from './components/News';
import AuthenticationPage from './components/AuthenticationPage';
import Header from './components/Header';
import TopHeadlines from './components/TopHeadlines';
import SearchResults from './components/SearchResults';
import Finance from './components/Finance';
import Sports from './components/Sports';

function App() {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<News />} />
        <Route path="/auth/*" element={<AuthenticationPage />} />
        <Route path="/top-headlines" element={<TopHeadlines />} />
        <Route path="/finance" element={<Finance />} />
        <Route path="/sports" element={<Sports />} />
        <Route path="/search" element={<SearchResults />} />
      </Routes>
    </div>
  );
}

export default App;
