import React, { useEffect, useState } from 'react';
import axios from 'axios';
import MusicMediaItem from './MusicMediaItem';

const MusicSection = () => {
  const [musicItems, setMusicItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchMusic = async () => {
      try {
        const response = await axios.get('https://itunes.apple.com/search', {
          params: { term: 'music', media: 'music', limit: 4},
        });
        console.log('Fetched music items:', response.data.results); // Debugging line
        setMusicItems(response.data.results.slice(0, 8)); // Display only the first 8 items
      } catch (error) {
        console.error('Error fetching music items:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMusic();
  }, []);

  return (
    <div className="music-section">
      <h2>Music</h2>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div className="row g-5">
          {musicItems.length > 0 ? (
            musicItems.map((item, index) => (
              <MusicMediaItem key={index} item={item} />
            ))
          ) : (
            <p>No music items found.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default MusicSection;

