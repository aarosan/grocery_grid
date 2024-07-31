// This index.js file is the second point of entry, after routes/index.js

const router = require('express').Router();

// import routes/api/testRoutes
const testRoutes = require('./testRoutes');

// URL is now http://localhost:3001/api/tests
router.use('/tests', testRoutes);

module.exports = router;
