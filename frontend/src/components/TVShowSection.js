// TVShowsSection.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import TVShowMediaItem from './TVShowMediaItem';

const TVShowSection = () => {
  const [tvShowItems, setTVShowItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchTVShows = async () => {
      try {
        const response = await axios.get('https://itunes.apple.com/search', {
          params: {
            term: 'TV Shows',         // No search term; fetches general results
            media: 'tvShow',  // Type of media to fetch
            limit: 4,         // Limit to 8 items
          },
        });
        setTVShowItems(response.data.results); // Set the results directly
      } catch (error) {
        console.error('Error fetching TV show items:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTVShows();
  }, []);

  return (
    <div className="tvshows-section">
      <h2>TV Shows</h2>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div className="row g-5">
          {tvShowItems.map((item, index) => (
            <TVShowMediaItem key={index} item={item} />
          ))}
        </div>
      )}
    </div>
  );
};

export default TVShowSection;

