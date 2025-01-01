require('dotenv').config(); // Load environment variables
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

// Middleware
app.use(cors()); // Allow all origins (or configure specific origins)
app.use(express.json()); // Parse JSON request bodies

// Connect to MongoDB Atlas
const MONGO_URI = process.env.MONGO_URI; // Use environment variable
mongoose.connect(MONGO_URI)
  .then(() => console.log('Connected to MongoDB Atlas'))
  .catch((err) => console.error('Error connecting to MongoDB Atlas:', err));

// Import and use task routes
const taskRoutes = require('./routes/taskRoutes');
app.use('/api', taskRoutes);

// Basic route
app.get('/', (req, res) => {
  res.send('Backend is running!');
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));