import React, { useEffect, useState } from 'react';
import { Paper,Grid, Box, Button } from '@mui/material';
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Pagination from '@mui/material/Pagination';
import CustomCardMedia from '../common/CustomCardMedia';
import axios from 'axios';
import NotFoundPage from '../common/NotFoundPage';

const SearchResults = () => {
  const location = useLocation();
  const query = new URLSearchParams(location.search).get('q');
  const [searchResults, setSearchResults] = useState([]);
  const [page, setPage] = useState(1);
  const articlesPerPage = 20;

  useEffect(() => {
    const newsApiKey = process.env.REACT_APP_NEWSAPI_KEY;
    const newsApiUrl = `${process.env.REACT_APP_NEWSAPI_URL}/everything`;

    const guardianApiKey = process.env.REACT_APP_THEGUARDIAN_KEY;
    const guardianApiUrl = `${process.env.REACT_APP_THEGUARDIAN_URL}`;

    const nyTimesApiKey = process.env.REACT_APP_NYT_KEY;
    const nyTimesApiUrl = `${process.env.REACT_APP_NYT_URL}/search/v2/articlesearch.json`;

    console.log('Query:', query);
    const sentNewsApiURL = `${newsApiUrl}?q=${query}&pageSize=${articlesPerPage}&page=${page}&apiKey=${newsApiKey}`;
    const sentGuardianApiURL = `${guardianApiUrl}?q=${query}&api-key=${guardianApiKey}`;
    const sentNYTApiURL = `${nyTimesApiUrl}?q=${query}&api-key=${nyTimesApiKey}`;

    const fetchData = async () => {
      try {
        const [newsResponse, guardianResponse, nyTimesResponse] = await Promise.all([
          axios.get(sentNewsApiURL),
          axios.get(sentGuardianApiURL),
          axios.get(sentNYTApiURL),
        ]);

        const combinedData = [
          ...newsResponse.data.articles,
          ...guardianResponse.data.response.results,
          ...nyTimesResponse.data.response.docs,
        ];

        // Sort the combinedData by publication date in descending order
        combinedData.sort((a, b) => {
          const dateA = a.publishedAt || a.webPublicationDate || a.pub_date;
          const dateB = b.publishedAt || b.webPublicationDate || b.pub_date;
          return new Date(dateB) - new Date(dateA);
        });

        setSearchResults(combinedData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [query, page]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const startIndex = (page - 1) * articlesPerPage;
  const endIndex = startIndex + articlesPerPage;
  const displayedNews = searchResults.slice(startIndex, endIndex);

  return (
    <Grid className="news-container" sx={{paddingLeft:1}}>
      <Grid container spacing={2}>
        {displayedNews.map((article, index) => (
          <Grid key={index} item xs={12} sm={6} md={4} lg={3}>
            <Paper elevation={3} className="news-article">
              <h2>{article.title || article.webTitle}</h2>
              <p>{article.description || article.abstract}</p>
              <Button component={Link} to={article.url || article.webUrl} target="_blank" rel="noopener noreferrer">
                  Learn More
                </Button>
              <CustomCardMedia article={article}/>
            </Paper>
            {(index + 1) % 4 === 0 && (
              <Box sx={{ borderTop: 1, borderColor: 'divider' }} mt={2} mb={2} display={{ xs: 'none', sm: 'none', md: 'inline-block', lg:'inline-block' }} />
            )}
          </Grid>
        ))}
      </Grid>
      <Pagination
        count={Math.ceil(searchResults.length / articlesPerPage)}
        page={page}
        onChange={handleChangePage}
        color="primary"
        size="large"
        style={{ marginTop: '20px', display: 'flex', justifyContent: 'center' }}
      />
    </Grid>
  );
};

export default SearchResults;
