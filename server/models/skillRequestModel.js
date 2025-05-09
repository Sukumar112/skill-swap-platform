const mongoose = require('mongoose');

const skillRequestSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true, // The user who is sending the request
  },
  requestedUser: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true, // The user whose skill is being requested
  },
  skill: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Skill',
    required: true, // The skill being requested
  },
  status: {
    type: String,
    enum: ['pending', 'accepted', 'rejected'],
    default: 'pending', // Default status is 'pending'
  },
}, { timestamps: true });

module.exports = mongoose.model('SkillRequest', skillRequestSchema);
