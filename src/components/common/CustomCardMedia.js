import { CardMedia } from '@mui/material';

const CustomCardMedia = ({ article }) => {
    // Set the image URL based on conditions
    const image = article.urlToImage !== undefined
      ? article.urlToImage
      : article.source !== undefined
      ? 'https://static01.nyt.com/vi-assets/images/share/1200x675_nameplate.png'
      : 'https://assets-legacy.floridarrc.com/2023/01/the-guardian-logo.jpeg';
  
    return (
      <CardMedia
        component="img"
        height="140"
        image={image}
      />
    );
  };
  

export default CustomCardMedia;