const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

// Import your routes
const authRoutes = require('./routes/authRoutes'); // Authentication routes
const skillRoutes = require('./routes/skillRoutes'); // Skill-related routes
const skillRequestRoutes = require('./routes/skillRequestRoutes'); // Skill request routes

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // Parse incoming JSON requests

// API Routes
app.use('/api/skills', skillRoutes); // Handle skill-related requests
app.use('/api/auth', authRoutes); // Handle authentication requests
app.use('/api/requests', skillRequestRoutes); // Handle skill requests

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch((err) => console.error(err));

// Server setup
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
