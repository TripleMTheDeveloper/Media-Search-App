// BooksSection.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import BookMediaItem from './BookMediaItem';

const BookSection = () => {
  const [bookItems, setBookItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get('https://itunes.apple.com/search', {
          params: {
            term: 'Books',         // No search term; fetches general results
            media: 'ebook',   // Type of media to fetch
            limit: 4,         // Limit to 8 items
          },
        });
        setBookItems(response.data.results); // Set the results directly
      } catch (error) {
        console.error('Error fetching book items:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBooks();
  }, []);

  return (
    <div className="books-section">
      <h2>Books</h2>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div className="row g-5">
          {bookItems.map((item, index) => (
            <BookMediaItem key={index} item={item} />
          ))}
        </div>
      )}
    </div>
  );
};

export default BookSection;
