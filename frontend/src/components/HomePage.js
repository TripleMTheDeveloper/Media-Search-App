import React, { useState } from 'react';
import axios from 'axios';
import ITunesSearch from './ITunesSearch';
import MusicMediaItem from './MusicMediaItem';
import MovieMediaItem from './MovieMediaItem';
import TVShowMediaItem from './TVShowMediaItem';
import AppMediaItem from './AppMediaItem';
import BookMediaItem from './BookMediaItem';
import MusicSection from './MusicSection';
import 'bootstrap/dist/css/bootstrap.min.css';
import './HomePage.css';
import MoviesSection from './MoviesSection';
import BookSection from './BookSection';
import AppSection from './AppSection';
import TVShowSection from './TVShowSection';

const HomePage = () => {
  const [mediaItems, setMediaItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchMedia = async (query, type) => {
    setIsLoading(true);
    try {
      const response = await axios.get('/api/search', {
        params: { term: query, media: type },
      });
      setMediaItems(response.data.results); // iTunes API returns data in 'results'
    } catch (error) {
      console.error('Error fetching media:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = (query, type) => {
    fetchMedia(query, type);
  };

  

  return (
    <div className="container">
      <div className='navbar'>
        <ITunesSearch onSearch={handleSearch} />
      
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <div className="row g-7">
            {mediaItems.map((item, index) => {
              switch (item.kind) {
                case 'song':
                  return <MusicMediaItem key={index} item={item} />; // Pass 'item' correctly
                case 'movie':
                  return <MovieMediaItem key={index} item={item} />;
                case 'tv-episode':
                  return <TVShowMediaItem key={index} item={item} />;
                case 'software':
                  return <AppMediaItem key={index} item={item} />;
                case 'ebook':
                  return <BookMediaItem key={index} item={item} />;
                default:
                  return null;
              }
            })}
          </div>
         )}
      </div>
      
      <div className='section'>
        <MusicSection/>
      </div>
      <hr></hr>
      <div className='section'>
        <MoviesSection/>
      </div>
      <hr></hr>
      <div className='section'>
        <BookSection/>
      </div>
      <hr></hr>
      <div className='section'>
        <AppSection/>
      </div>
      <hr></hr>
      <div className='section'>
        <TVShowSection/>
      </div>
      <hr></hr>
    </div>
  );
};

export default HomePage;




















