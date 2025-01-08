// src/api.js
import axios from 'axios';

export const fetchArticles = async (searchQuery, filters) => {
  const { date, category, source } = filters;
  try {
    const res = await axios.get('https://newsapi.org/v2/everything', {
      params: {
        q: searchQuery,
        from: date,
        category: category,
        sources: source,
        apiKey: 'your-api-key-here',
      },
    });
    return res.data.articles;
  } catch (error) {
    console.error('Error fetching articles:', error);
    return [];
  }
};
