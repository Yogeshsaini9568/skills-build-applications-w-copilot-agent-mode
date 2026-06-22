const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Team = require('../models/Team');

// Leaderboard: top users and top teams
router.get('/', async (req, res, next) => {
  try {
    const topUsers = await User.find().sort({ points: -1 }).limit(10).select('name points');
    const topTeams = await Team.find().sort({ points: -1 }).limit(10).select('name points');
    res.json({ users: topUsers, teams: topTeams });
  } catch (err) { next(err); }
});

module.exports = router;
