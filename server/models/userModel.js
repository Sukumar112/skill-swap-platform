const mongoose = require('mongoose');

// Define the schema for the User model
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    // Add other fields as necessary
  },
  { timestamps: true } // Automatically add createdAt and updatedAt fields
);

// Check if the model is already defined. If not, define it.
const User = mongoose.models.User || mongoose.model('User', userSchema);

module.exports = User;
