const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
const authenticateJWT = require('../middleware/authMiddleware');

// Route to generate a JWT token
router.get('/generate-token', (req, res) => {
  const token = jwt.sign({}, process.env.JWT_SECRET, { expiresIn: '1h' });
  res.json({ token });
});

// Search route (protected by JWT)
router.get('/search', authenticateJWT, (req, res) => {
  // Your search logic here
  res.json({ message: 'Search route' });
});

module.exports = router;





