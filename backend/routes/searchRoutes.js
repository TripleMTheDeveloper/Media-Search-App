const express = require('express');
const jwt = require('jsonwebtoken');
const { generateAccessToken, generateRefreshToken } = require('../utils/tokenUtils');

const router = express.Router();

let refreshTokens = []; // This will hold refresh tokens temporarily. Use a database in production.

// Login route (for generating access and refresh tokens)
router.post('/login', (req, res) => {
  // Mock user for the purpose of the example
  const user = { id: 1, username: 'exampleUser' };

  // Generate tokens
  const accessToken = generateAccessToken(user);
  const refreshToken = generateRefreshToken(user);

  // Store refresh token (in-memory here, but use a database in production)
  refreshTokens.push(refreshToken);

  // Send tokens to the client
  res.json({ accessToken, refreshToken });
});

// Refresh token route (to get a new access token using refresh token)
router.post('/refresh-token', (req, res) => {
  const { token } = req.body;

  // Check if a refresh token is provided
  if (!token) return res.status(401).json({ message: 'Refresh token required' });

  // Check if the refresh token is valid
  if (!refreshTokens.includes(token)) return res.status(403).json({ message: 'Invalid refresh token' });

  // Verify the refresh token
  jwt.verify(token, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: 'Invalid or expired refresh token' });

    // Generate a new access token
    const accessToken = generateAccessToken({ id: user.id, username: user.username });
    res.json({ accessToken });
  });
});

// Logout route (to invalidate the refresh token)
router.post('/logout', (req, res) => {
  const { token } = req.body;
  refreshTokens = refreshTokens.filter(t => t !== token); // Remove refresh token
  res.json({ message: 'Logged out successfully' });
});

module.exports = router;






