// This index.js is the entrance point for the routes directory

// Router import from the express library
const router = require('express').Router();

// router/api import
const apiRoutes = require('./api');

// URL is now http://localhost:3001/api
router.use('/api', apiRoutes);

router.use((req, res) => {
  return res.send('Wrong route!');
});

module.exports = router;
