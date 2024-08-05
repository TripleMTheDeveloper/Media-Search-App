import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ITunesSearch from './ITunesSearch';
import MusicMediaItem from './MusicMediaItem';
import MovieMediaItem from './MovieMediaItem';
import TVShowMediaItem from './TVShowMediaItem';
import AppMediaItem from './AppMediaItem';
import BookMediaItem from './BookMediaItem';
import MovieArt2 from './images/MovieArt2.png';
import MovieArt1 from './images/MovieArt1.jpg';
import AlbumArt1 from './images/AlbumArt1.jpg';
import { Button, Dropdown, DropdownButton } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './HomePage.css';

const HomePage = () => {
  // State to store media items fetched from the API
  const [mediaItems, setMediaItems] = useState([]);

  // State to store the list of selected (favorite) media items
  const [selectedItems, setSelectedItems] = useState([]);

  // State to manage the loading status
  const [isLoading, setIsLoading] = useState(false);

  // useEffect to fetch JWT token on component mount if it's not already in local storage
  useEffect(() => {
    const fetchToken = async () => {
      if (!localStorage.getItem('jwtToken')) {
        try {
          const response = await axios.get('http://localhost:5001/api/generate-token');
          const { token } = response.data;
          localStorage.setItem('jwtToken', token);
        } catch (error) {
          console.error('Error fetching token:', error);
        }
      }
    };

    fetchToken();
  }, []);

  // Function to fetch media items based on query and type
  const fetchMedia = async (query, type) => {
    setIsLoading(true); // Set loading state to true
    try {
      const token = localStorage.getItem('jwtToken'); // Get token from local storage
      const response = await axios.get('http://localhost:5001/api/search', {
        params: { term: query, media: type },
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.data && Array.isArray(response.data.results)) {
        const fetchedMedia = response.data.results.map((item) => ({
          trackId: item.trackId,
          trackName: item.trackName,
          artistName: item.artistName,
          albumName: item.albumName,
          collectionName: item.collectionName,
          releaseDate: item.releaseDate,
          artworkUrl100: item.artworkUrl100 ? item.artworkUrl100.replace('100x100', '600x600') : '',
          mediaType: type,
        }));
        setMediaItems(fetchedMedia); // Update state with fetched media items
      } else {
        console.warn('No media items found');
        setMediaItems([]); // Clear media items if none are found
      }
    } catch (error) {
      console.error('Error fetching media:', error);
    }
    setIsLoading(false); // Set loading state to false
  };

  // Function to handle search results from ITunesSearch component
  const handleSearchResults = (query, mediaType) => {
    fetchMedia(query, mediaType); // Fetch media based on search results
  };

  // Function to add an item to the favorites list
  const handleSelectItem = (item) => {
    setSelectedItems((prevSelectedItems) => [...prevSelectedItems, item]);
  };

  // Function to remove an item from the favorites list
  const handleRemoveItem = (item) => {
    setSelectedItems((prevSelectedItems) => prevSelectedItems.filter((selectedItem) => selectedItem.trackId !== item.trackId));
  };

  // Function to scroll the page to the top
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="container position-relative">
      <div className="position-relative">
        <h1 className="mb-4">TripleM Media</h1>
        <ITunesSearch onSearchResults={handleSearchResults} />
        <DropdownButton variant='danger' className='favorites-dropdown-button' title="Favourites List">
          {selectedItems.map((item) => (
            <Dropdown.Item key={item.trackId}>
              {item.trackName} by {item.artistName}
              <Button
                variant="danger"
                size="sm"
                onClick={() => handleRemoveItem(item)}
                className="ml-2"
              >
                Remove
              </Button>
            </Dropdown.Item>
          ))}
        </DropdownButton>
      </div>

      {mediaItems.length === 0 && !isLoading && (
        <div className="page-content">
          <h2>Welcome to TripleM Media</h2>
          <figure className="movie-art">
            <img src={MovieArt2} alt="description1" className='MovieArt2' />
          </figure>
          <p>Discover and explore your favorite music, movies, TV shows, apps, and books with ease. Our app provides a simple and intuitive way to search and find the best media available on iTunes. Whether you're a music lover, a movie buff, or a bookworm, you'll find everything you need right here!</p>
          <p>Explore a world of media with TripleM Media Hub, where you can search and discover top albums, singles, and artists in music, as well as popular films and upcoming releases in movies. From blockbusters to indie gems, find your next movie night pick or catch up on trending TV shows and new series. Our platform also lets you browse the latest and most popular apps for your devices, offering tools, games, and utilities to enhance your digital life, while also helping you discover bestsellers and new releases in books, including novels and non-fiction.</p>
          <figure className="movie-art">
            <img src={MovieArt1} alt="description1" className='MovieArt1'/>
          </figure>
          <p>Get started by using our search bar to find specific media or browse by category. Dive into TripleM Media Hub now to enjoy the best of what iTunes has to offer!</p>
          <p>Discover the magic of music with TripleM Media Hub. Our extensive library includes genres from classical to contemporary, featuring top hits and hidden gems. Dive into detailed artist profiles, album reviews, and curated playlists that cater to every mood and occasion. Whether you want to relax, workout, or throw a party, our app has the perfect soundtrack for you.</p>
          <figure className="movie-art">
            <img src={AlbumArt1} alt="description1" className='AlbumArt1'/>
          </figure>
          <p>Immerse yourself in the cinematic experience with our movie collection. Stay updated with the latest releases, watch trailers, read reviews, and find recommendations tailored to your taste. Our database includes everything from Hollywood blockbusters to independent films, ensuring you never run out of great content to watch. Create your own watchlist and never miss out on the movies that matter to you.</p>
          <p>Stay entertained with our selection of TV shows. From gripping dramas and hilarious comedies to insightful documentaries and reality TV, we have something for everyone. Keep track of your favorite series, get notifications for new episodes, and explore related shows that match your interests. Binge-watch with ease and keep up with trending shows that everyone is talking about.</p>
        </div>
      )}

      <div className="results">
        <div className="row">
          {isLoading ? (
            <div className="col-12 text-center">
              <p>Loading...</p>
            </div>
          ) : (
            mediaItems.map((item) => {
              // Determine which media component to use based on media type
              const MediaItemComponent = (() => {
                switch (item.mediaType) {
                  case 'movie': return MovieMediaItem;
                  case 'tvShow': return TVShowMediaItem;
                  case 'software': return AppMediaItem;
                  case 'ebook': return BookMediaItem;
                  default: return MusicMediaItem;
                }
              })();

              return (
                <div key={item.trackId} className="col-md-4 mb-4">
                  <MediaItemComponent item={item} />
                  <Button variant="danger" className="add-to-favorites-btn" onClick={() => handleSelectItem(item)}>
                    Add To Favourites
                  </Button>
                  <Button variant="danger" className="remove-from-favorites-btn" onClick={() => handleRemoveItem(item)}>
                    Remove from Favourites
                  </Button>
                </div>
              );
            })
          )}
        </div>
      </div>

      <Button variant="danger" onClick={scrollToTop} className="scroll-to-top-btn">
        Scroll to Top
      </Button>
    </div>
  );
};

export default HomePage;
















