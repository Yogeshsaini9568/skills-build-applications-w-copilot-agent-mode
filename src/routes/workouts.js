const express = require('express');
const router = express.Router();
const Workout = require('../models/Workout');

// List workouts
router.get('/', async (req, res, next) => {
  try {
    const workouts = await Workout.find().populate({ path: 'activities', populate: { path: 'user', select: 'name' } });
    res.json(workouts);
  } catch (err) { next(err); }
});

// Create workout
router.post('/', async (req, res, next) => {
  try {
    const w = new Workout(req.body);
    await w.save();
    res.status(201).json(w);
  } catch (err) { next(err); }
});

module.exports = router;
