# OctoFit Tracker - Multi-Tier Application

A modern fitness tracking application built with React 19, Express.js, TypeScript, and MongoDB.

## Architecture

```
octofit-tracker/
├── frontend/               # React 19 + Vite frontend
│   ├── src/
│   ├── package.json
│   ├── vite.config.ts
│   └── tsconfig.json
└── backend/               # Node.js + Express + TypeScript backend
    ├── src/
    │   ├── models/        # Mongoose schemas
    │   └── index.ts
    ├── package.json
    └── tsconfig.json
```

## Port Configuration

- **Frontend**: `http://localhost:5173` (Vite dev server)
- **Backend API**: `http://localhost:8000`
- **MongoDB**: `mongodb://localhost:27017`

## Getting Started

### Frontend Setup

```bash
cd octofit-tracker/frontend
npm install
npm run dev
```

### Backend Setup

```bash
cd octofit-tracker/backend
npm install
cp .env.example .env
npm run dev
```

### MongoDB Setup

Ensure MongoDB is running on `mongodb://localhost:27017`

```bash
# Using Docker (optional)
docker run -d -p 27017:27017 --name mongodb mongo:latest
```

## Features

- **User Management**: User authentication and profiles
- **Workout Tracking**: Log workouts with duration, intensity, and calories burned
- **TypeScript**: Full type safety across the stack
- **CORS Enabled**: Frontend-backend communication configured
- **Environment Variables**: Configurable ports and MongoDB URI

## Development

### Frontend Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run lint` - Run linter

### Backend Scripts

- `npm run dev` - Start development server with ts-node
- `npm run build` - Compile TypeScript to JavaScript
- `npm start` - Start production server

## Technology Stack

- **Frontend**: React 19, Vite, TypeScript
- **Backend**: Express.js, TypeScript
- **Database**: MongoDB with Mongoose ODM
- **Runtime**: Node.js (ES Modules)

## Environment Variables

Create a `.env` file in the backend directory:

```env
MONGODB_URI=mongodb://localhost:27017/octofit-tracker
NODE_ENV=development
PORT=8000
CORS_ORIGIN=http://localhost:5173
```

## API Endpoints

- `GET /api/health` - Health check endpoint

## License

MIT
