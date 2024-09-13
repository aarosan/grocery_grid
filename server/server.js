// Express Configuration
const express = require('express');
const cors = require('cors');
const app = express();

// Setup MongoDB for the application in config/connection.js
const db = require('./config/connection');

// Define Routes for the application starting in routes/index.js
const routes = require('./routes');

// Change the port number
const port = process.env.PORT || 5000;

const apiUrl = 'https://grocery-grid-fffe5a21c358.herokuapp.com';
const localhostUrl = 'http://localhost';


// Middleware
app.use(cors({ origin: apiUrl }));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(routes);

// Start the server only after the MongoDB connection is open
db.once('open', () => {
  console.log('MongoDB connection established successfully');
  app.listen(port, () => {
    console.log(`API server running at ${clienUrl}!`);
  });
});

// Handle MongoDB connection errors
db.on('error', (err) => {
  console.error('MongoDB connection error:', err);
});
