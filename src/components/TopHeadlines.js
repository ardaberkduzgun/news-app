// TopHeadlines.js
import React, { useEffect, useState } from 'react';
import { Card, CardContent, Typography, Grid, Paper, CardMedia } from '@mui/material';

const apiKey = 'd22436a596554c609ceafdf92193a95f'; // Replace with your News API key
const apiUrl = 'https://newsapi.org/v2/top-headlines';
const country = 'us';
const category = 'business';
const pageSize = 20; // 20 news articles per page

const TopHeadlines = () => {
  const [headlines, setHeadlines] = useState([]);

  useEffect(() => {
    debugger;
    // Fetch top headlines data from the News API
    fetch(`${apiUrl}?country=${country}&category=${category}&pageSize=${pageSize}&apiKey=${apiKey}`)
      .then((response) => response.json())
      .then((data) => {
        setHeadlines(data.articles);
      });
  }, []);

  return (
    <Grid container spacing={2}>
      {headlines.map((article, index) => (
        <Grid item key={index} xs={12} sm={6} md={4} lg={3}>
          <Paper>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                {article.title}
              </Typography>
              <Typography variant="body2">
                {article.description}
              </Typography>
               <CardMedia
               component="img"
               height="140"
               image={article.urlToImage}
               alt={article.title}
             />
              
            </CardContent>
          </Paper>
        </Grid>
      ))}
    </Grid>
  );
};

export default TopHeadlines;
