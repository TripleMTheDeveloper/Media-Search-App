import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const TVShowMediaItem = ({ item }) => {
  return (
    <div className="col-md-3 mb-4 d-flex align-items-stretch">
      <figure className="figure">
        <img
          src={item.artworkUrl100 || 'https://via.placeholder.com/150'}
          alt={item.trackName}
          className="figure-img img-fluid rounded"
        />
        <figcaption className="figure-caption text-center">
          <h5>{item.trackName}</h5>
          <p className="text-muted">{item.artistName}</p>
          <p>{item.releaseDate}</p>
        </figcaption>
      </figure>
    </div>
  );
};

export default TVShowMediaItem;

