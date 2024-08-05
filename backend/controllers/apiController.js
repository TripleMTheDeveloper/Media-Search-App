const express = require('express');
const jwt = require('jsonwebtoken');
const axios = require('axios');
const router = express.Router();
const authenticateJWT = require('../middleware/authMiddleware');

// Route to generate a JWT token
router.get('/generate-token', (req, res) => {
  const payload = { user: 'example' };
  const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
  res.json({ token });
});

// Route to search media (protected by JWT)
router.get('/search', authenticateJWT, async (req, res) => {
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
      trackId: item.trackId || item.collectionId, // Adjust as needed
      trackName: item.trackName,
      artistName: item.artistName,
      collectionName: item.collectionName,
      artworkUrl100: item.artworkUrl100,
      mediaType: media, // Adjust to match frontend
    }));

    res.json({ results });
  } catch (error) {
    console.error('Error fetching data from iTunes Search API:', error);
    res.status(500).send('Error fetching data from iTunes Search API');
  }
});

module.exports = router;



