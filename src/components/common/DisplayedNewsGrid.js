import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Grid, Paper, Button, Box } from '@mui/material';
import { Link } from 'react-router-dom';
import Pagination from '@mui/material/Pagination';
import CustomCardMedia from '../common/CustomCardMedia'

const DisplayedNewsGrid = ({displayedNews,sendPageChange,news,articlesPerPage,page}) =>{

    const handleChangePage = (event,value) => {
        sendPageChange(value);
    };

    return(
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

export default DisplayedNewsGrid;