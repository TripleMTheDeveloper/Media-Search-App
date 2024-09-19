import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const TVShowMediaItem = ({ item }) => {
  const highResArtworkUrl = item.artworkUrl100.replace('100x100bb.jpg', '500x500bb.jpg');
  return (
    <div className="col-md-3 mb-4 d-flex align-items-stretch">
      <figure className="figure">
        <img
          src={highResArtworkUrl || 'https://via.placeholder.com/500'}
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


