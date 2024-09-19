// AppsSection.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AppMediaItem from './AppMediaItem';

const AppSection = () => {
  const [appItems, setAppItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchApps = async () => {
      try {
        const response = await axios.get('https://itunes.apple.com/search', {
          params: {
            term: 'apps',         // No search term; fetches general results
            media: 'software', // Type of media to fetch (software for apps)
            limit: 4,         // Limit to 8 items
          },
        });
        setAppItems(response.data.results); // Set the results directly
      } catch (error) {
        console.error('Error fetching app items:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchApps();
  }, []);

  return (
    <div className="apps-section">
      <h2>Apps</h2>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div className="row g-5">
          {appItems.map((item, index) => (
            <AppMediaItem key={index} item={item} />
          ))}
        </div>
      )}
    </div>
  );
};

export default AppSection;
