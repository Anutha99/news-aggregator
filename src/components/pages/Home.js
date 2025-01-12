import { useEffect, useState } from 'react';
import { TextField, MenuItem, FormControl, InputLabel, Select, Button, Card, CardContent, CardMedia, Typography, Box, Container } from '@mui/material';
import { fetchArticles } from '../../services/api';
import Header from '../Header'; 

const categories = ['business', 'technology', 'sports', 'health', 'entertainment'];
const sources = ['bbc-news', 'the-new-york-times', 'the-guardian'];

const Home = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('business');
  const [source, setSource] = useState(''); 
  const [date, setDate] = useState(''); 

  useEffect(() => {
    const getArticles = async () => {
      setLoading(true);
      const fetchedArticles = await fetchArticles(query, category, source, date);
      setArticles(fetchedArticles);
      setLoading(false);
    };
  
    getArticles();
  }, [query, category, source, date]); 
  
  

  const commonHeight = 56; 

  return (
    <div style={{ padding: '20px' }}>
      <Header />
      <Container maxWidth="lg" style={{ marginTop: '20px' }}>
        <Box display="flex" flexWrap="wrap" gap={2} justifyContent="space-between" marginBottom="20px">
          <TextField
            label="Search Articles"
            variant="outlined"
            fullWidth
            value={query}
            onChange={(e) => setQuery(e.target.value)} 
            style={{ flex: 1, minWidth: '250px', height: commonHeight }} 
          />

          <FormControl variant="outlined" style={{ flex: 1, minWidth: '200px', height: commonHeight }}>
            <InputLabel>Category</InputLabel>
            <Select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              label="Category"
              style={{ height: commonHeight }} 
            >
              {categories.map((cat) => (
                <MenuItem key={cat} value={cat}>
                  {cat}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl variant="outlined" style={{ flex: 1, minWidth: '200px', height: commonHeight }}>
            <InputLabel>Source</InputLabel>
            <Select
              value={source}
              onChange={(e) => setSource(e.target.value)}
              label="Source"
              style={{ height: commonHeight }} 
            >
              <MenuItem value="">All Sources</MenuItem>
              {sources.map((src) => (
                <MenuItem key={src} value={src}>
                  {src}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <TextField
              label="Select Date"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              slotProps={{
                inputLabel: { shrink: true }, 
              }}
              
              style={{ flex: 1, minWidth: '200px', height: commonHeight }} 
            />
          <Button
            variant="outlined"
            onClick={() => { setQuery(''); setCategory('business'); setSource(''); setDate(''); }}
            style={{ alignSelf: 'flex-end', height: commonHeight }} 
          >
            Reset Filters
          </Button>
        </Box>

        {loading ? (
          <p>Loading...</p>
        ) : (
          <>
            {articles.length === 0 ? (
              <Typography variant="h6" color="text.secondary" align="center">
                No data available
              </Typography>
            ) : (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
                {articles.map((article, index) => (
                  <Card key={index} variant="outlined" style={{ maxWidth: 345 }}>
                    {/* Conditional Rendering for Image */}
                    <CardMedia
                      component="div"
                      style={{
                        height: 140,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: '#f0f0f0',
                      }}
                    >
                      {article.image ? (
                        <img
                          src={article.image}
                          alt={article.title}
                          style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                          }}
                        />
                      ) : (
                        <Typography variant="body2" color="text.secondary" style={{ textAlign: 'center', padding: '10px' }}>
                          No Image Available
                        </Typography>
                      )}
                    </CardMedia>
                    <CardContent>
                      <Typography variant="h6" component="div">
                        {article.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" style={{ margin: '10px 0' }}>
                        {article.description || 'No description available'}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Source: {article.source || 'Unknown Source'}
                      </Typography>
                      <Button size="small" color="primary" href={article.url} target="_blank" style={{ marginTop: '10px' }}>
                        Read More
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </>
        )}
      </Container>
    </div>
  );
};

export default Home;
