const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config(); // Load environment variables from .env file

// Middleware function to authenticate JWT access token
const authenticateJWT = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1]; // Extract token from Authorization header

  if (token) {
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
      if (err) {
        return res.status(403).json({ message: 'Invalid or expired access token' });
      }
      req.user = user; // Attach user info to request
      next(); // Proceed to the next middleware or route
    });
  } else {
    res.status(401).json({ message: 'Access token required' });
  }
};

module.exports = authenticateJWT;








