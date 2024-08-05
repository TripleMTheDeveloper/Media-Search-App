import React from 'react'; // Importing React library
import 'bootstrap/dist/css/bootstrap.min.css'; // Importing Bootstrap CSS for styling

// Component to display a single book media item
const BookMediaItem = ({ item }) => {
  return (
    // Bootstrap grid system for responsive layout
    <div className="col-md-3 mb-4 d-flex align-items-stretch">
      <figure className="figure">
        {/* Displaying the image with fallback to a placeholder if the URL is not provided */}
        <img
          src={item.artworkUrl100 || 'https://via.placeholder.com/150'} // Image source
          alt={item.trackName} // Alt text for the image
          className="figure-img img-fluid rounded" // Bootstrap classes for image styling
        />
        <figcaption className="figure-caption text-center">
          {/* Displaying the collection name (e.g., book title) */}
          <h5>{item.collectionName}</h5>
          {/* Displaying the artist name (e.g., author) */}
          <p className="text-muted">{item.artistName}</p>
          {/* Displaying a description of the item */}
          <p>{item.description}</p>
        </figcaption>
      </figure>
    </div>
  );
};

export default BookMediaItem; // Exporting the component for use in other files


