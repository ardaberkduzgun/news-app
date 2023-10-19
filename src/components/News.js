//News.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Grid, Paper } from '@mui/material';
import Pagination from '@mui/material/Pagination';
import CustomCardMedia from './common/CustomCardMedia'


const News = () => {
  const [news, setNews] = useState([]);
  const [page, setPage] = useState(1);
  const articlesPerPage = 20;
  

  useEffect(() => {
    const apiKey = process.env.REACT_APP_NEWSAPI_KEY;
    const apiUrl = `${process.env.REACT_APP_NEWSAPI_URL}/everything?q=new&apiKey=${apiKey}`;

    axios.get(apiUrl)
      .then(response => {
        setNews(response.data.articles);
      })
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
    <div className="news-container">
      <Grid container spacing={2}>
        {displayedNews.map((article, index) => (
          <Grid key={index} item xs={12} sm={6} md={4} lg={3}>
            <Paper elevation={3} className="news-article">
              <h2>{article.title}</h2>
              <p>{article.description}</p>
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
    </div>
  );
};

export default News;
