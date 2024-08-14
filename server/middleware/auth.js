const jwt = require('jsonwebtoken');
const JWT_SECRET = 'your_jwt_secret'; // Ensure this matches the secret used for signing the token

// Middleware for token validation with logging
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  // console.log('Received token:', token); // Debugging line

  if (!token) {
    console.log('No token provided'); // Debugging line
    return res.sendStatus(401);
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      console.log('Token verification failed:', err.message); // Debugging line
      return res.sendStatus(403);
    }
    
    // console.log('Token verified, user:', user); // Debugging line
    req.userId = user.userId; // Set req.userId from token payload
    next();
  });
};

module.exports = authenticateToken;