// SearchResults.js
import React, { useEffect, useState } from 'react';
import { Card, CardContent, Typography, Grid } from '@mui/material';
import { useLocation } from 'react-router-dom';
import Pagination from '@mui/material/Pagination';
import CustomCardMedia from './common/CustomCardMedia';
import axios from 'axios';
import NotFoundPage from './common/NotFoundPage'







const SearchResults = () => {
  const location = useLocation();
  const query = new URLSearchParams(location.search).get('q');
  const [searchResults, setSearchResults] = useState([]);
  const [page, setPage] = useState(1);
  const articlesPerPage = 20; 

  useEffect(() => {

    const apiKey = process.env.REACT_APP_NEWSAPI_KEY;
    const apiUrl = `${process.env.REACT_APP_NEWSAPI_URL}/everything`;

    console.log('Query:', query);
    const sentURL = `${apiUrl}?q=${query}&pageSize=${articlesPerPage}&page=${page}&apiKey=${apiKey}`;
    axios.get(sentURL)
      .then(response => {
        if (response.data.totalResults > 0) {
          setSearchResults(response.data.articles); // response.data ile veriye eriş
        }
        else {
          setSearchResults([]);
        }
      })
      .catch(error => {
        setSearchResults([]);
        console.error("Veri getirme hatası: " + error);
      });
  }, [query, page]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const startIndex = (page - 1) * articlesPerPage;
  const endIndex = startIndex + articlesPerPage;
  const displayedNews = searchResults.slice(startIndex, endIndex);

  return (
    <div>
      <Grid container spacing={2}>
        {searchResults.length > 0 ? searchResults.map((article, index) => (
          <Grid item key={index} xs={12} sm={6} md={4} lg={3}>
            <Card>
              <CustomCardMedia article={article} />
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
        )) :
        <Grid>
          <NotFoundPage/>
          </Grid>
        }
      </Grid>
      <Pagination
        count={Math.ceil(searchResults.length / articlesPerPage)}
        page={page}
        onChange={handleChangePage}
        color="primary"
        size="large"
        style={{ marginTop: '20px', display: 'flex', justifyContent: 'center' }}
      />
    </div>
  );
};

export default SearchResults;
