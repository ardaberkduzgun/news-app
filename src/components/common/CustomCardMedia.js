import { CardMedia } from '@mui/material';

const CustomCardMedia = ({article}) => {
    return(
        <CardMedia
               component="img"
               height="140"
               image={article.urlToImage}
               alt={article.title}
             />
    );
};

export default CustomCardMedia;