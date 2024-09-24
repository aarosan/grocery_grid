// This index.js file is the second point of entry, after routes/index.js

const router = require('express').Router();

const userRoutes = require('./userRoutes');

router.use('/users', userRoutes);

router.get('/test', (req, res) => {
  res.send('Hello World!');
});

module.exports = router;
