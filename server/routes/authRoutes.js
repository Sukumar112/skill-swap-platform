const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');

router.get('/me', authMiddleware, (req, res) => {
  res.status(200).json({
    user: req.user, // set in middleware
    message: 'Access granted to protected route',
  });
});

module.exports = router;


// Register a new user
router.post('/register', async (req, res) => {
  const { name, email, password } = req.body;
  
  // Check if the user already exists
  const userExists = await User.findOne({ email });
  if (userExists) return res.status(400).json({ message: 'User already exists' });

  // Create a new user
  const newUser = new User({ name, email, password });
  await newUser.save();
  
  // Generate JWT token
  const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, { expiresIn: '1d' });

  res.status(201).json({ token, user: newUser });
});

// User login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  // Check if the user exists
  const user = await User.findOne({ email });
  if (!user) return res.status(400).json({ message: 'Invalid credentials' });

  // Compare the password
  const isMatch = await user.comparePassword(password);
  if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

  // Generate JWT token
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });

  res.status(200).json({ token, user });
});


router.get('/me', authMiddleware, (req, res) => {
  res.status(200).json({
    user: req.user, // set in middleware
    message: 'Access granted to protected route',
  });
});

module.exports = router;
