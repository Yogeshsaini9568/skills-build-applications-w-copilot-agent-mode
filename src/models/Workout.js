const mongoose = require('mongoose');
const { Schema } = mongoose;

const WorkoutSchema = new Schema({
  name: { type: String, required: true },
  activities: [{ type: Schema.Types.ObjectId, ref: 'Activity' }],
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Workout', WorkoutSchema);
