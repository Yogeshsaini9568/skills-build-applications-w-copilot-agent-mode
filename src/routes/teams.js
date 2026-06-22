const express = require('express');
const router = express.Router();
const Team = require('../models/Team');
const User = require('../models/User');

// List teams
router.get('/', async (req, res, next) => {
  try {
    const teams = await Team.find().populate('members', 'name email');
    res.json(teams);
  } catch (err) { next(err); }
});

// Create team
router.post('/', async (req, res, next) => {
  try {
    const t = new Team(req.body);
    await t.save();
    res.status(201).json(t);
  } catch (err) { next(err); }
});

// Add member to team
router.post('/:id/members', async (req, res, next) => {
  try {
    const team = await Team.findById(req.params.id);
    if (!team) return res.status(404).json({ error: 'Team not found' });
    const user = await User.findById(req.body.userId);
    if (!user) return res.status(404).json({ error: 'User not found' });
    user.team = team._id;
    await user.save();
    team.members.push(user._id);
    await team.save();
    res.json(team);
  } catch (err) { next(err); }
});

module.exports = router;
