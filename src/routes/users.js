const express = require('express');
const router = express.Router();
const User = require('../models/User');

// List users
router.get('/', async (req, res, next) => {
  try {
    const users = await User.find().populate('team', 'name');
    res.json(users);
  } catch (err) { next(err); }
});

// Create user
router.post('/', async (req, res, next) => {
  try {
    const u = new User(req.body);
    await u.save();
    res.status(201).json(u);
  } catch (err) { next(err); }
});

// Get user by id
router.get('/:id', async (req, res, next) => {
  try {
    const u = await User.findById(req.params.id).populate('team', 'name');
    if (!u) return res.status(404).json({ error: 'User not found' });
    res.json(u);
  } catch (err) { next(err); }
});

module.exports = router;
