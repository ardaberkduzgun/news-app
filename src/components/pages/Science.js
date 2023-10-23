import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Grid, Paper, Button, Box } from '@mui/material';
import { Link } from 'react-router-dom';
import Pagination from '@mui/material/Pagination';
import CustomCardMedia from '../common/CustomCardMedia'
import DisplayedNewsGrid from '../common/DisplayedNewsGrid';

const Science = () => {
  const [news, setNews] = useState([]);
  const [page, setPage] = useState(1);
  const articlesPerPage = 20;

  useEffect(() => {
    const newsApiKey = process.env.REACT_APP_NEWSAPI_KEY; 
    const newsApiUrl = `${process.env.REACT_APP_NEWSAPI_URL}/everything?q=science&apiKey=${newsApiKey}`;

    const guardianApiKey = process.env.REACT_APP_THEGUARDIAN_KEY;
    const guardianApiUrl = `${process.env.REACT_APP_THEGUARDIAN_URL}?section=science&api-key=${guardianApiKey}`;

    const nyTimesApiKey = process.env.REACT_APP_NYT_KEY;
    const nyTimesApiUrl = `${process.env.REACT_APP_NYT_URL}/topstories/v2/science.json?api-key=${nyTimesApiKey}`;

    const newsRequest = axios.get(newsApiUrl);
    const guardianRequest = axios.get(guardianApiUrl);
    const nyTimesRequest = axios.get(nyTimesApiUrl);

    axios
    .all([newsRequest, guardianRequest, nyTimesRequest])
    .then(axios.spread((newsResponse, guardianResponse, nyTimesResponse) => {

      const combinedNews = [...newsResponse.data.articles, ...guardianResponse.data.response.results, ...nyTimesResponse.data.results,];
      
      combinedNews.sort((a, b) => {
        const dateA = a.publishedAt || a.webPublicationDate || a.published_date;
        const dateB = b.publishedAt || b.webPublicationDate || b.published_date;
        return new Date(dateB) - new Date(dateA);
      });
      
      setNews(combinedNews);
    }))
    .catch(error => {
      console.error(error);
    });
}, []);

  const handleChangePage = (newPageValue) => {
    setPage(newPageValue);
  };

  const startIndex = (page - 1) * articlesPerPage;
  const endIndex = startIndex + articlesPerPage;
  const displayedNews = news.slice(startIndex, endIndex);

  return (<DisplayedNewsGrid displayedNews = {displayedNews}
    sendPageChange = {handleChangePage} 
    news = {news}
    articlesPerPage = {articlesPerPage} 
    page = {page}/>);
};

export default Science;
