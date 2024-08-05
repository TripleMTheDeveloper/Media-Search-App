const jwt = require('jsonwebtoken');

// Define your JWT secret key
const SECRET_KEY = 'MyKey';

// Create a token
const token = jwt.sign({}, SECRET_KEY, { expiresIn: '1h' });

// Print the token to the console
console.log('Generated JWT Token:', token);
