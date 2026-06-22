require('dotenv').config();
const express = require('express');
const { connectDB } = require('./config/db');

const usersRouter = require('./routes/users');
const teamsRouter = require('./routes/teams');
const activitiesRouter = require('./routes/activities');
const workoutsRouter = require('./routes/workouts');
const leaderboardRouter = require('./routes/leaderboard');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.get('/health', (req, res) => res.json({ status: 'ok' }));

app.use('/users', usersRouter);
app.use('/teams', teamsRouter);
app.use('/activities', activitiesRouter);
app.use('/workouts', workoutsRouter);
app.use('/leaderboard', leaderboardRouter);

// Generic error handler
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: err.message || 'Server error' });
});

async function start() {
  await connectDB();
  app.listen(port, () => console.log(`Server listening on port ${port}`));
}

start();
