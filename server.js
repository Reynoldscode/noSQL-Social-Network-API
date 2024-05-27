const express = require('express');
const routes = require('./routes');
const db = require('./config/connection');

const PORT = process.env.PORT || 3001;
const app = express();

// Use middleware to parse incoming data
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Use routes defined in routes.js
app.use(routes);

// MongoDB connection error handling
db.on('error', (error) => {
  console.error('MongoDB connection error:', error);
});

// Connect to the MongoDB database and start the server
db.once('open', () => {
  app.listen(PORT, () => {
    console.log(`API server running on port ${PORT}!`);
  });
});