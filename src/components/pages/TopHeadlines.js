import React, { useEffect, useState } from 'react';
import axios from 'axios';
import moment from 'moment';
import DisplayedNewsGrid from '../common/DisplayedNewsGrid';

const TopHeadlines = () => {
  const [news, setNews] = useState([]);
  const [page, setPage] = useState(1);
  const articlesPerPage = 20;


  useEffect(() => {
    const newsApiKey = process.env.REACT_APP_NEWSAPI_KEY;
    const newsApiUrl = `${process.env.REACT_APP_NEWSAPI_URL}/everything?q=news&apiKey=${newsApiKey}`;

    const guardianApiKey = process.env.REACT_APP_THEGUARDIAN_KEY;
    const guardianApiUrl = `${process.env.REACT_APP_THEGUARDIAN_URL}section=news&api-key=${guardianApiKey}`;

    const nyTimesApiKey = process.env.REACT_APP_NYT_KEY;
    const nyTimesApiUrl = `${process.env.REACT_APP_NYT_URL}/mostpopular/v2/viewed/1.json?api-key=${nyTimesApiKey}`;

    const newsRequest = axios.get(newsApiUrl);
    const guardianRequest = axios.get(guardianApiUrl);
    const nyTimesRequest = axios.get(nyTimesApiUrl);

    const moment = require('moment');
    const date = moment('2023-10-22T18:03:27Z');

    axios
      .all([newsRequest, guardianRequest, nyTimesRequest])
      .then(axios.spread((newsResponse, guardianResponse, nyTimesResponse) => {

        const combinedNews = [...newsResponse.data.articles, ...guardianResponse.data.response.results, ...nyTimesResponse.data.results,];

        combinedNews.forEach((item) => {
          if (item.publishedAt) {
            item.publishedDate = moment(item.publishedAt);
          } else if (item.webPublicationDate) {
            item.publishedDate = moment(item.webPublicationDate);
          } else if (item.pub_date) {
            item.publishedDate = moment(item.published_date, 'YYYY-MM-DDTHH:mm:ssZ');
          }
        });

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

  return (<DisplayedNewsGrid displayedNews={displayedNews}
    sendPageChange={handleChangePage}
    news={news}
    articlesPerPage={articlesPerPage}
    page={page} />);
};

export default TopHeadlines;
