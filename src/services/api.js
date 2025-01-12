import axios from 'axios';

const NEWS_API_KEY = '97be3c20c5024b6f9d4dd82d595d67c3';
const NEWS_API_URL = 'https://newsapi.org/v2';
const GUARDIAN_API_URL = 'https://content.guardianapis.com';
const GUARDIAN_API_KEY = '5d0e51a6-7b3d-4d9a-aabc-bb2f1d767e3f';
const NYT_API_URL = 'https://api.nytimes.com/svc/topstories/v2';
const NYT_API_KEY = 'B70x0ustlBwfQy5JmP2Mvhke6Fx3YdHA';

const fetchFromNewsAPI = async (query, category, source, date) => {
  try {
    const params = {
      country: 'us',
      category: category,
      q: query,  
      apiKey: NEWS_API_KEY,
    };

    if (date) {
      params['from'] = date; 
    }

    const response = await axios.get(`${NEWS_API_URL}/top-headlines`, {
      params: params,
    });

    return response.data.articles.map((article) => ({
      title: article.title,
      description: article.description || 'No description available',
      url: article.url,
      source: article.source.name,
      image: article.urlToImage || '',
    }));
  } catch (error) {
    console.error('Error fetching from NewsAPI:', error);
    return [];
  }
};



const fetchFromGuardian = async (query, category, source, date) => {
  try {
    const params = {
      'api-key': GUARDIAN_API_KEY,
      q: query,  
      'show-fields': 'all',
    };

    if (date) {
      params['from-date'] = date;
    }

    const response = await axios.get(`${GUARDIAN_API_URL}/search`, { params });

    return response.data.response.results
      .filter((article) => article.webTitle.toLowerCase().includes(query.toLowerCase())) 
      .map((article) => ({
        title: article.webTitle,
        description: article.fields?.trailText || 'No description available',
        url: article.webUrl,
        source: 'The Guardian',
        image: article.fields?.thumbnail || '',
      }));
  } catch (error) {
    console.error('Error fetching from The Guardian:', error);
    return [];
  }
};

const fetchFromNYT = async (query, category, source, date) => {
  try {
    const params = {
      'api-key': NYT_API_KEY,
    };
    const response = await axios.get(`${NYT_API_URL}/${category}.json`, { params });
    return response.data.results
      .filter((article) => article.title.toLowerCase().includes(query.toLowerCase())) 
      .map((article) => ({
        title: article.title,
        description: article.abstract || 'No description available',
        url: article.url,
        source: 'The New York Times',
        image: article.multimedia && article.multimedia.length > 0
          ? article.multimedia[0].url
          : '',
      }));
  } catch (error) {
    console.error('Error fetching from The New York Times:', error);
    return [];
  }
};

export const fetchArticles = async (query, category, source, date) => {
  try {
    let articles = [];

    if (query.trim() === '') {
      if (source === '') {
        const [newsAPIArticles, guardianArticles, nytArticles] = await Promise.all([
          fetchFromNewsAPI(query, category, source, date),
          fetchFromGuardian(query, category, source, date),
          fetchFromNYT(query, category, source, date),
        ]);
        articles = [...newsAPIArticles, ...guardianArticles, ...nytArticles];
      } else {
        if (source === 'bbc-news') {
          articles = await fetchFromNewsAPI(query, category, source, date);
        } else if (source === 'the-guardian') {
          articles = await fetchFromGuardian(query, category, source, date);
        } else if (source === 'the-new-york-times') {
          articles = await fetchFromNYT(query, category, source, date);
        }
      }
    } else {
      if (source === '') {
        const [newsAPIArticles, guardianArticles, nytArticles] = await Promise.all([
          fetchFromNewsAPI(query, category, source, date),
          fetchFromGuardian(query, category, source, date),
          fetchFromNYT(query, category, source, date),
        ]);
        articles = [...newsAPIArticles, ...guardianArticles, ...nytArticles];
      } else {
        if (source === 'bbc-news') {
          articles = await fetchFromNewsAPI(query, category, source, date);
        } else if (source === 'the-guardian') {
          articles = await fetchFromGuardian(query, category, source, date);
        } else if (source === 'the-new-york-times') {
          articles = await fetchFromNYT(query, category, source, date);
        }
      }
    }

    return articles;
  } catch (error) {
    console.error('Error fetching articles:', error);
    return [];
  }
};


