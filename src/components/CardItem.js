import { Card, CardActions, CardHeader, CardMedia, CardContent, Typography, Button, Avatar } from '@mui/material';

import { getFirstLetter } from '../common/utils';
const CardItem = ({ title, publishedAt, urlToImage, description, author, handleClick }) => {
  return (
    <Card sx={{ width: '100%', minHeight: '50vh' }}>
      <CardHeader avatar={<Avatar sx={{ bgcolor: 'red' }}>{author ? getFirstLetter(author) : 'U'}</Avatar>} title={title} subheader={new Date(publishedAt).toDateString()} />
      <CardMedia component="img" height="194" image={urlToImage ? urlToImage : 'https://icon-library.com/images/no-picture-available-icon/no-picture-available-icon-1.jpg'} />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <Button onClick={handleClick}>Read Full Article</Button>
      </CardActions>
    </Card>
  );
};

export default CardItem;
