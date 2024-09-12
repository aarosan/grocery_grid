const mongoose = require('mongoose');
require('dotenv').config(); 

const dbUri = process.env.MONGODB_URI;
console.log('dbUri:', dbUri);

if (!dbUri) {
  throw new Error('MONGODB_URI environment variable is not set.');
}

mongoose.connect(dbUri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

