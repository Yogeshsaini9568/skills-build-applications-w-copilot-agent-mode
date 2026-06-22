# Octofit Logic Tier (Express + MongoDB)

This folder contains a minimal Express logic tier for the Octofit exercise.

What is included:

- MongoDB connection via MONGODB_URI (defaults to mongodb://localhost:27017/octofit_db)
- Mongoose models: User, Team, Activity, Workout
- Routes: /users, /teams, /activities, /workouts, /leaderboard
- Health endpoint: GET /health
- Seed script: `npm run seed` (runs scripts/seed.js)

Quick start:

1. Install dependencies:

   npm install

2. Start MongoDB (local or provide MONGODB_URI in a .env file)

3. Seed example data:

   npm run seed

4. Run the server:

   npm start

Endpoints:
- GET /health
- GET/POST /users
- GET /users/:id
- GET/POST /teams
- POST /teams/:id/members { userId }
- GET/POST /activities
- GET/POST /workouts
- GET /leaderboard

Notes:
- The seed script wipes relevant collections first.
- Points are a simple derived value in activities and propagated to users and teams.
