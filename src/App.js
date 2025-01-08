// src/App.js
import React, { useState, useEffect } from 'react';
import ArticleList from './Components/ArticleList';
import { fetchArticles } from './api';

const App = () => {
  const [articles, setArticles] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    date: '',
    category: '',
    source: '',
  });

  // Fetch articles when search query or filters change
  useEffect(() => {
    const fetchData = async () => {
      const fetchedArticles = await fetchArticles(searchQuery, filters);
      setArticles(fetchedArticles);
    };
    fetchData();
  }, [searchQuery, filters]);

  return (
    <div className="app-container">
      {/* Filters Section */}
      <div className="filters-container">
        {/* Add your filter components here, such as search input, source selector, category selector, etc. */}
      </div>

      {/* Articles List */}
      <ArticleList articles={articles} />
    </div>
  );
};

export default App;
