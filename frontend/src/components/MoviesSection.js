import React, { useEffect, useState } from 'react';
import axios from 'axios';
import MovieMediaItem from './MovieMediaItem';
import 'bootstrap/dist/css/bootstrap.min.css';

const MoviesSection = () => {
  const [movieItems, setMovieItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get('https://itunes.apple.com/search', {
          params: {
            term: 'movies',
            media: 'movie',
            limit: 4,
          },
        });
        setMovieItems(response.data.results);
      } catch (error) {
        console.error('Error fetching movie items:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMovies();
  }, []);

  return (
    <div className="movies-section">
      <h2>Movies</h2>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div className="row g-5">
          {movieItems.length > 0 ? (
            movieItems.map((item, index) => (
              <MovieMediaItem key={index} item={item} />
            ))
          ) : (
            <p>No music items found.</p>
          )}
        </div>
      )}
    </div>
  );
};;

export default MoviesSection;

