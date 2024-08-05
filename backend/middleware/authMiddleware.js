const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config(); // Load environment variables from .env file

// Middleware function to authenticate JWT
const authenticateJWT = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1]; // Extract token from Authorization header

  if (token) {
    console.log('Token received:', token); // Log the token
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => { // Verify token using secret key
      if (err) {
        console.log('Token verification failed:', err.message); // Log the error
        return res.status(403).json({ message: 'Forbidden', error: err.message }); // Forbidden if token verification fails
      }
      console.log('Token successfully verified:', user); // Log the successful verification
      req.user = user; // Attach user info to request object
      next(); // Pass control to the next middleware or route handler
    });
  } else {
    console.log('No token provided'); // Log if no token is provided
    res.status(401).json({ message: 'Unauthorized' }); // Unauthorized if no token is provided
  }
};

module.exports = authenticateJWT; // Export the middleware function







