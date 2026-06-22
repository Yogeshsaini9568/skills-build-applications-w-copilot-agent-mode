import { Router, Request, Response } from 'express';
import { Workout } from '../models/Workout.js';

const router = Router();

// Create a new workout
router.post('/', async (req: Request, res: Response) => {
  try {
    const { userId, title, description, duration, intensity, caloriesBurned, exerciseType, date } = req.body;

    // Validate required fields
    if (!userId || !title || !duration || !caloriesBurned || !exerciseType) {
      res.status(400).json({ error: 'Missing required fields' });
      return;
    }

    const workout = new Workout({
      userId,
      title,
      description,
      duration,
      intensity,
      caloriesBurned,
      exerciseType,
      date
    });

    await workout.save();

    res.status(201).json({
      message: 'Workout created successfully',
      workout
    });
  } catch (error) {
    console.error('Create workout error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get all workouts for a user
router.get('/user/:userId', async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const workouts = await Workout.find({ userId }).sort({ date: -1 });

    res.json({
      count: workouts.length,
      workouts
    });
  } catch (error) {
    console.error('Get workouts error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get a single workout by ID
router.get('/:workoutId', async (req: Request, res: Response) => {
  try {
    const { workoutId } = req.params;
    const workout = await Workout.findById(workoutId);

    if (!workout) {
      res.status(404).json({ error: 'Workout not found' });
      return;
    }

    res.json(workout);
  } catch (error) {
    console.error('Get workout error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Update a workout
router.put('/:workoutId', async (req: Request, res: Response) => {
  try {
    const { workoutId } = req.params;
    const { title, description, duration, intensity, caloriesBurned, exerciseType, date } = req.body;

    const workout = await Workout.findByIdAndUpdate(
      workoutId,
      { title, description, duration, intensity, caloriesBurned, exerciseType, date },
      { new: true, runValidators: true }
    );

    if (!workout) {
      res.status(404).json({ error: 'Workout not found' });
      return;
    }

    res.json({
      message: 'Workout updated successfully',
      workout
    });
  } catch (error) {
    console.error('Update workout error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Delete a workout
router.delete('/:workoutId', async (req: Request, res: Response) => {
  try {
    const { workoutId } = req.params;
    const workout = await Workout.findByIdAndDelete(workoutId);

    if (!workout) {
      res.status(404).json({ error: 'Workout not found' });
      return;
    }

    res.json({ message: 'Workout deleted successfully' });
  } catch (error) {
    console.error('Delete workout error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get workout statistics for a user
router.get('/stats/:userId', async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const workouts = await Workout.find({ userId });

    const stats = {
      totalWorkouts: workouts.length,
      totalDuration: workouts.reduce((sum, w) => sum + w.duration, 0),
      totalCalories: workouts.reduce((sum, w) => sum + w.caloriesBurned, 0),
      averageDuration: workouts.length > 0 ? Math.round(workouts.reduce((sum, w) => sum + w.duration, 0) / workouts.length) : 0,
      averageCalories: workouts.length > 0 ? Math.round(workouts.reduce((sum, w) => sum + w.caloriesBurned, 0) / workouts.length) : 0
    };

    res.json(stats);
  } catch (error) {
    console.error('Get stats error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
