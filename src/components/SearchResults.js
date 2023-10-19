// SearchResults.js
import React, { useEffect, useState } from 'react';
import { Card, CardContent, Typography, Grid } from '@mui/material';
import { useLocation } from 'react-router-dom';
import CustomCardMedia from './common/CustomCardMedia'


const apiKey = process.env.REACT_APP_NEWSAPI_KEY;
const apiUrl =  `${process.env.REACT_APP_NEWSAPI_URL}/everything`;
const pageSize = 20; // 20 news articles per page


const SearchResults = () => {
  const location = useLocation();
  const query = new URLSearchParams(location.search).get('q');
  const [searchResults, setSearchResults] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    console.log('Query:', query);
    const sentURL = `${apiUrl}?q=${query}&pageSize=${pageSize}&page=${page}&apiKey=${apiKey}`;
    fetch(sentURL)
      .then((response) => response.json())
      .then((data) => {
        setSearchResults(data.articles);
      });
  }, [query, page]);

  return (
    <div>
      <Grid container spacing={2}>
        {searchResults.map((article, index) => (
          <Grid item key={index} xs={12} sm={6} md={4} lg={3}>
            <Card>
            <CustomCardMedia article={article}/>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  {article.title}
                </Typography>
                <Typography variant="body2">
                  {article.description}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      {/* Pagination goes here */}
    </div>
  );
};

export default SearchResults;
