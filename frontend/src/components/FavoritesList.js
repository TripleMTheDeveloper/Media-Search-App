import React from 'react'; // Importing React library
import { useFavorites } from './FavoritesContext'; // Importing custom hook to access favorites context
import { Button } from 'react-bootstrap'; // Importing Button component from react-bootstrap

// Component to display a list of favorite items
const FavoritesList = () => {
  // Destructuring favorites and removeFavorite function from the context
  const { favorites, removeFavorite } = useFavorites();

  return (
    <div className="favorites-list">
      <h2>Favorites</h2>
      <div>
        {/* Mapping through the favorites array to render each item */}
        {favorites.map((item) => (
          <div key={item.trackId} className="col-md-4">
            <div className="card">
              {/* Displaying the image of the favorite item */}
              <img src={item.artworkUrl100} alt={item.trackName} />
              <div className="card-body">
                {/* Displaying the track name */}
                <h5 className="card-title">{item.trackName}</h5>
                {/* Displaying the artist name */}
                <p className="card-text">{item.artistName}</p>
                {/* Button to remove the item from favorites */}
                <Button variant="danger" onClick={() => removeFavorite(item.trackId)}>
                  Remove
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FavoritesList; // Exporting the component for use in other files

