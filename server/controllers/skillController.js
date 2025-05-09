const Skill = require('../models/skillModel');

const addSkill = async (req, res) => {
    const { skillName, description } = req.body;
  
    if (!skillName) {
      return res.status(400).json({ message: 'Skill name is required' });
    }
  
    try {
      console.log("Authenticated user ID:", req.user.id);
      console.log("Request body:", req.body);
  
      const skill = await Skill.create({
        user: req.user.id,
        skillName,
        description,
      });
  
      console.log("Skill created:", skill);
      res.status(201).json(skill);
    } catch (err) {
      console.error('Error adding skill:', err);
      res.status(500).json({ message: 'Server error', error: err.message });
    }
  };
  const getSkills = async (req, res) => {
    const { search } = req.query;
  
    const query = {
      $or: [
        { skillName: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ]
    };
  
    try {
      const skills = await Skill.find(query).populate('user', 'name'); // <- Add this
      res.json(skills);
    } catch (err) {
      res.status(500).json({ message: 'Server error', error: err.message });
    }
  };
  
  
const deleteSkill = async (req, res) => {
    try {
      const skill = await Skill.findById(req.params.id);
      if (!skill) return res.status(404).json({ message: 'Skill not found' });
  
      if (skill.user.toString() !== req.user.id)
        return res.status(403).json({ message: 'Unauthorized' });
  
      await skill.deleteOne();
      res.json({ message: 'Skill deleted' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server error' });
    }
  };
  
  const updateSkill = async (req, res) => {
    const { skillName, description } = req.body;
  
    try {
      const skill = await Skill.findById(req.params.id);
      if (!skill) return res.status(404).json({ message: 'Skill not found' });
  
      if (skill.user.toString() !== req.user.id)
        return res.status(403).json({ message: 'Unauthorized' });
  
      skill.skillName = skillName || skill.skillName;
      skill.description = description || skill.description;
      await skill.save();
  
      res.json(skill);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server error' });
    }
  };
  
  module.exports = {
    addSkill,
    getSkills,
    deleteSkill,
    updateSkill
  };
  

