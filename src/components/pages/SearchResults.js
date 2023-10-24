import React, { useEffect, useState } from 'react';
import { Paper, Grid, Box, Button, TextField } from '@mui/material';
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

  const handleFilter = () => {

  };

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
          
          ...newsResponse.data.articles.map(item => {

            const { title,publishedAt,author, ...rest } = item;

            return {
              category: item.title,
              publishedDate: item.publishedAt,
              author: item.author,
              ...rest
            };
          }),
          
          ...guardianResponse.data.response.results.map(item => {
            
            const { pillarName,webPublicationDate, ...rest } = item;

            return {
              category: item.pillarName,
              publishedDate: item.webPublicationDate,
              ...rest
            };
          }),
        
          ...nyTimesResponse.data.response.docs.map(item => {
            const { section, published_date, ...rest } = item;
                      const author = item.byline && item.byline.person && item.byline.person.length > 0
              ? (item.byline.person[0].firstname + ' ' + item.byline.person[0].lastname)
              : 'Unknown Author';
          
            return {
              category: section,
              publishedDate: published_date,
              author,
              ...rest
            };
          })
        ];

        debugger;


        combinedData.sort((a, b) => {
          const dateA = a.publishedAt || a.webPublicationDate || a.published_date;
          const dateB = b.publishedAt || b.webPublicationDate || b.published_date;
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
//  TODO filter

  return (
    <>
    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
      <Grid container sx={{ paddingTop: 2}} spacing={20}>
        <Grid item xs={12} sm={12} md={12} lg={12}>
          <TextField label="Author" placeholder="Author" />
          <TextField label="Category" placeholder="Category" />
          <TextField label="Date" placeholder="Date" />
          <Button variant="contained" color="primary" onClick={handleFilter} sx={{borderRadius: 4 }}>
            Filter
          </Button>
        </Grid>
      </Grid>
      </Box>
      <Grid className="news-container" sx={{ paddingLeft: 1 }}>
        <Grid container spacing={2}>
          {displayedNews.map((article, index) => (
            <Grid key={index} item xs={12} sm={6} md={4} lg={3}>
              <Paper elevation={3} className="news-article">
                <h2>{article.title || article.webTitle}</h2>
                <p>{article.description || article.abstract}</p>
                <Button component={Link} to={article.url || article.webUrl} target="_blank" rel="noopener noreferrer">
                  Learn More
                </Button>
                <CustomCardMedia article={article} />
              </Paper>
              {(index + 1) % 4 === 0 && (
                <Box sx={{ borderTop: 1, borderColor: 'divider' }} mt={2} mb={2} display={{ xs: 'none', sm: 'none', md: 'inline-block', lg: 'inline-block' }} />
              )}
            </Grid>
          )) }
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
    </>
  );
};

export default SearchResults;
