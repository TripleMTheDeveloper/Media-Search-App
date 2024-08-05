import React from 'react'; // Importing React library
import 'bootstrap/dist/css/bootstrap.min.css'; // Importing Bootstrap CSS for styling

// Component to display a single media item
const AppMediaItem = ({ item }) => {
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
          {/* Displaying the track name */}
          <h5>{item.trackName}</h5>
          {/* Displaying the artist name */}
          <p className="text-muted">{item.artistName}</p>
        </figcaption>
      </figure>
    </div>
  );
};

export default AppMediaItem; // Exporting the component for use in other files

