import { Card, CardContent, CardMedia, Typography } from '@mui/material';

const ArticleCard = ({ article }) => (
  <Card sx={{ maxWidth: 345 }}>
    <CardMedia
      component="img"
      height="140"
      image={article.urlToImage || 'https://via.placeholder.com/150'}
      alt={article.title}
    />
    <CardContent>
      <Typography variant="h6">{article.title}</Typography>
      <Typography variant="body2" color="text.secondary">
        {article.description}
      </Typography>
      <Typography variant="body2" color="text.primary">
        {article.source.name}
      </Typography>
    </CardContent>
  </Card>
);

export default ArticleCard;
