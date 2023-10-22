import React, { useEffect, useState } from 'react';
import {CardContent, Typography, Grid, Paper, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import CustomCardMedia from './common/CustomCardMedia'
 
const apiKey = process.env.REACT_APP_NEWSAPI_KEY;
const apiUrl = process.env.REACT_APP_NEWSAPI_URL +  '/top-headlines';


const country = 'us';
const category = 'business';
const pageSize = 20;

const TopHeadlines = () => {
  const [headlines, setHeadlines] = useState([]);

  useEffect(() => {

    const sendURL = `${apiUrl}?country=${country}&category=${category}&pageSize=${pageSize}&apiKey=${apiKey}`; 
    fetch(sendURL)
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
              <Button component={Link} to={article.url} target="_blank" rel="noopener noreferrer">
                  Learn More
                </Button>
              <CustomCardMedia article={article}/>
            </CardContent>
          </Paper>
        </Grid>
      ))}
    </Grid>
  );
};

export default TopHeadlines;
