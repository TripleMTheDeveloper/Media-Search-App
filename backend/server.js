const express = require('express');
const axios = require('axios');
const app = express();
const port = 5000; // Adjust port if needed

// Backend route for fetching iTunes data
app.get('/api/search', async (req, res) => {
  const { term, media } = req.query;

  try {
    // Fetch data from iTunes API
    const response = await axios.get('https://itunes.apple.com/search', {
      params: {
        term, // Search term from frontend
        media, // Media type from frontend
      },
    });

    // Send the data back to the frontend
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching data from iTunes API:', error);
    res.status(500).json({ error: 'Failed to fetch data from iTunes API' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Backend server running on http://localhost:${port}`);
});














