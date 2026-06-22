import mongoose, { Schema, Document } from 'mongoose';

export interface IWorkout extends Document {
  userId: string;
  title: string;
  description: string;
  duration: number;
  intensity: 'low' | 'medium' | 'high';
  caloriesBurned: number;
  exerciseType: string;
  date: Date;
  createdAt: Date;
  updatedAt: Date;
}

const workoutSchema = new Schema<IWorkout>(
  {
    userId: {
      type: String,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      default: ''
    },
    duration: {
      type: Number,
      required: true,
      min: 1
    },
    intensity: {
      type: String,
      enum: ['low', 'medium', 'high'],
      default: 'medium'
    },
    caloriesBurned: {
      type: Number,
      required: true,
      min: 0
    },
    exerciseType: {
      type: String,
      required: true
    },
    date: {
      type: Date,
      default: Date.now
    }
  },
  {
    timestamps: true
  }
);

export const Workout = mongoose.model<IWorkout>('Workout', workoutSchema);
