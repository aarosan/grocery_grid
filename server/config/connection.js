const { connect, connection } = require('mongoose');

// Define the database name
const dbName = 'exampleDatabase';

// Get the MongoDB URI from environment variables or use a default value
const mongoHost = process.env.MONGO_HOST || '127.0.0.1';
const mongoPort = process.env.MONGO_PORT || '27017';
const mongoUser = process.env.MONGO_USER || '';
const mongoPass = process.env.MONGO_PASS || '';
const mongoDbName = process.env.MONGO_DB_NAME || dbName;

// Construct the MongoDB URI
let mongoURI = `mongodb://${mongoHost}:${mongoPort}/${mongoDbName}`;
if (mongoUser && mongoPass) {
  mongoURI = `mongodb://${mongoUser}:${mongoPass}@${mongoHost}:${mongoPort}/${mongoDbName}`;
}

connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('MongoDB connected successfully');
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
  });

module.exports = connection;
