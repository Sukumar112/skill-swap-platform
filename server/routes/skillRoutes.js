const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const {
    addSkill,
    getSkills,
    deleteSkill,
    updateSkill,
  } = require('../controllers/skillController');
  


router.post('/', authMiddleware, addSkill);
router.get('/', authMiddleware, getSkills);
router.delete('/:id', authMiddleware, deleteSkill);
router.put('/:id', authMiddleware, updateSkill);


module.exports = router;
