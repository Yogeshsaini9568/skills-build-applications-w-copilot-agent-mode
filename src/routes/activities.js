const express = require('express');
const router = express.Router();
const Activity = require('../models/Activity');
const User = require('../models/User');
const Team = require('../models/Team');

// List activities
router.get('/', async (req, res, next) => {
  try {
    const activities = await Activity.find().populate('user', 'name email');
    res.json(activities);
  } catch (err) { next(err); }
});

// Create activity (assigns points based on calories/duration)
router.post('/', async (req, res, next) => {
  try {
    const { user: userId, calories = 0, durationMinutes = 0 } = req.body;
    const points = Math.round((calories / 50) + (durationMinutes / 10));
    const a = new Activity({ ...req.body, points });
    await a.save();

    // Update user/team points
    const user = await User.findById(userId);
    if (user) {
      user.points = (user.points || 0) + points;
      await user.save();
      if (user.team) {
        await Team.findByIdAndUpdate(user.team, { $inc: { points } });
      }
    }

    res.status(201).json(a);
  } catch (err) { next(err); }
});

module.exports = router;
