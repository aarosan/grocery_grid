// Hello and welcome to the MERN_template server side code!

// MongoDB Configuration
//    - config directory
//    - models directory
//    - controllers directory

// Express Configuration
const express = require('express');
const cors = require('cors');
const app = express();

// Setup MongoDB for the application in config/connection.js
const db = require('./config/connection');

// Define Routes for the application starting in routes/index.js
const routes = require('./routes');

// Change the port number
const PORT = 3001;

// Middleware
app.use(cors({ origin: 'http://localhost:3000' }));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(routes);

// Database connector listener and server initialization
db.once('open', () => {
  app.listen(PORT, () => {
    console.log(`API server for running at http://localhost:${PORT}!`);
  });
});
