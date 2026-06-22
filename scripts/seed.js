// Simple seed script to populate octofit_db with example teams, users, activities, and workouts
require('dotenv').config();
const mongoose = require('mongoose');
const { connectDB } = require('../src/config/db');
const User = require('../src/models/User');
const Team = require('../src/models/Team');
const Activity = require('../src/models/Activity');
const Workout = require('../src/models/Workout');

async function seed() {
  await connectDB();

  console.log('Clearing existing data...');
  await Promise.all([
    User.deleteMany({}),
    Team.deleteMany({}),
    Activity.deleteMany({}),
    Workout.deleteMany({}),
  ]);

  console.log('Creating teams...');
  const t1 = await Team.create({ name: 'Red Octos' });
  const t2 = await Team.create({ name: 'Blue Squids' });

  console.log('Creating users...');
  const u1 = await User.create({ name: 'Alice', email: 'alice@example.com', team: t1._id });
  const u2 = await User.create({ name: 'Bob', email: 'bob@example.com', team: t2._id });
  const u3 = await User.create({ name: 'Carol', email: 'carol@example.com' });

  // attach members to teams
  t1.members.push(u1._id); await t1.save();
  t2.members.push(u2._id); await t2.save();

  console.log('Creating activities...');
  const a1 = await Activity.create({ user: u1._id, type: 'run', durationMinutes: 30, calories: 300, points:  Math.round((300/50)+(30/10)) });
  const a2 = await Activity.create({ user: u2._id, type: 'bike', durationMinutes: 45, calories: 500, points:  Math.round((500/50)+(45/10)) });
  const a3 = await Activity.create({ user: u1._id, type: 'yoga', durationMinutes: 60, calories: 200, points:  Math.round((200/50)+(60/10)) });

  // update user/team points
  u1.points = (a1.points || 0) + (a3.points || 0); await u1.save();
  u2.points = (a2.points || 0); await u2.save();
  await Team.findByIdAndUpdate(t1._id, { points: u1.points });
  await Team.findByIdAndUpdate(t2._id, { points: u2.points });

  console.log('Creating workouts...');
  const w1 = await Workout.create({ name: 'Morning Blast', activities: [a1._id, a3._id] });
  const w2 = await Workout.create({ name: 'Endurance Ride', activities: [a2._id] });

  console.log('Seed complete.');
  mongoose.connection.close();
}

seed().catch(err => { console.error(err); process.exit(1); });
