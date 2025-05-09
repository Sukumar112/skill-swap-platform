const express = require('express');
const SkillRequest = require('../models/skillRequestModel');
const User = require('../models/userModel'); // Assuming you have a User model
const authMiddleware = require('../middleware/authMiddleware'); // Assuming you have auth middleware

const router = express.Router();

// POST route to handle skill request
router.post('/request', authMiddleware, async (req, res) => {
    try {
      const { userId, skillId } = req.body;  // userId is the user who is requesting, skillId is the skill being requested
  
      if (!userId || !skillId) {
        return res.status(400).json({ message: 'UserId and skillId are required' });
      }
  
      // Ensure that the authenticated user (req.user.id) is sending the request, and not another user
      if (req.user.id === userId) {
        return res.status(400).json({ message: 'You cannot request your own skill' });
      }
  
      // Proceed with the request if all checks are passed
      const skillRequest = new SkillRequest({
        user: req.user.id, // Current authenticated user
        requestedUser: userId, // User whose skill is being requested
        skill: skillId, // Skill being requested
      });
  
      await skillRequest.save();  // Save to the database
  
      res.status(201).json({ message: 'Skill request sent successfully' });
    } catch (err) {
      console.error('Error while sending skill request:', err);
      res.status(500).json({ message: 'Failed to request skill' });
    }
  });
  

// GET route to fetch all skill requests for the user
router.get('/received', authMiddleware, async (req, res) => {
    try {
      const skillRequests = await SkillRequest.find({ requestedUser: req.user.id })
        .populate('user', 'name') // Populating user who requested the skill
        .populate('skill', 'skillName') // Populating the skill being requested
        .exec();
      
      res.status(200).json(skillRequests);
    } catch (err) {
      console.error('Error fetching skill requests:', err);
      res.status(500).json({ message: 'Failed to fetch skill requests' });
    }
  });

module.exports = router;
