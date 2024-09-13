// Express Configuration
const express = require('express');
const cors = require('cors');
const app = express();

// Setup MongoDB for the application in config/connection.js
const db = require('./config/connection');

// Define Routes for the application starting in routes/index.js
const routes = require('./routes');

// Change the port number
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors({ origin: 'http://localhost:3000' }));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(routes);

// Start the server only after the MongoDB connection is open
db.once('open', () => {
  console.log('MongoDB connection established successfully');
  app.listen(PORT, () => {
    console.log(`API server running at http://localhost:${PORT}!`);
  });
});

// Handle MongoDB connection errors
db.on('error', (err) => {
  console.error('MongoDB connection error:', err);
});
