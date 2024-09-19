const express = require('express');
const axios = require('axios');
const router = express.Router();

// Route to search media (without JWT)
router.get('/search', async (req, res) => {
  const { term, media } = req.query;

  try {
    const response = await axios.get('https://itunes.apple.com/search', {
      params: {
        term,
        media,
        limit: 50,
      },
    });

    console.log('iTunes API response:', response.data);

    const results = response.data.results.map((item) => ({
      trackId: item.trackId || item.collectionId,
      trackName: item.trackName,
      artistName: item.artistName,
      collectionName: item.collectionName,
      artworkUrl100: item.artworkUrl100,
      mediaType: media,
    }));

    res.json({ results });
  } catch (error) {
    console.error('Error fetching data from iTunes Search API:', error);
    res.status(500).send('Error fetching data from iTunes Search API');
  }
});

module.exports = router;




