import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Grid, Paper, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import Pagination from '@mui/material/Pagination';
import CustomCardMedia from './common/CustomCardMedia'

const Business = () => {
  const [news, setNews] = useState([]);
  const [page, setPage] = useState(1);
  const articlesPerPage = 20;
  
debugger;
  useEffect(() => {
    const newsApiKey = process.env.REACT_APP_NEWSAPI_KEY; 
    const newsApiUrl = `${process.env.REACT_APP_NEWSAPI_URL}/everything?q=news&apiKey=${newsApiKey}`;

    const guardianApiKey = process.env.REACT_APP_THEGUARDIAN_KEY;
    const guardianApiUrl = `${process.env.REACT_APP_THEGUARDIAN_URL}?section=business&api-key=${guardianApiKey}`;

    const nyTimesApiKey = process.env.REACT_APP_NYT_KEY;
    const nyTimesApiUrl = `${process.env.REACT_APP_NYT_URL}/news/v3/content/nyt/business.json?api-key=${nyTimesApiKey}`;

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

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const startIndex = (page - 1) * articlesPerPage;
  const endIndex = startIndex + articlesPerPage;
  const displayedNews = news.slice(startIndex, endIndex);

  return (
    <Grid className="news-container" sx={{paddingLeft:1}}>
      <Grid container spacing={2}>
        {displayedNews.map((article, index) => (
          <Grid key={index} item xs={12} sm={6} md={4} lg={3}>
            <Paper elevation={3} className="news-article">
              <h2>{article.title|| article.webTitle}</h2>
              <p>{article.description || article.abstract}</p>
              <Button component={Link} to={article.url || article.webUrl} target="_blank" rel="noopener noreferrer">
                  Learn More
                </Button>
              <CustomCardMedia article={article}/>
            </Paper>
          </Grid>
        ))}
      </Grid>
      <Pagination
        count={Math.ceil(news.length / articlesPerPage)}
        page={page}
        onChange={handleChangePage}
        color="primary"
        size="large"
        style={{ marginTop: '20px', display: 'flex', justifyContent: 'center' }}
      />
    </Grid>
  );
};

export default Business;
