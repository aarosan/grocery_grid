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

const clientUrl = process.env.REACT_APP_NETLIFY_URL || 'http://localhost:3000';
const apiUrl = process.env.REACT_APP_HEROKU_URL || 'http://localhost:5000';

console.log('Client URL:', clientUrl);
// Middleware

const allowedOrigins = process.env.ALLOWED_ORIGINS
  ? process.env.ALLOWED_ORIGINS.split(',')
  : ['http://localhost:3000'];

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(routes);

// Start the server only after the MongoDB connection is open
db.once('open', () => {
  console.log('MongoDB connection established successfully');
  app.listen(port, () => {
    console.log(`API server running at ${apiUrl}!`);
  });
});

// Handle MongoDB connection errors
db.on('error', (err) => {
  console.error('MongoDB connection error:', err);
});
