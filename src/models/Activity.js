const mongoose = require('mongoose');
const { Schema } = mongoose;

const ActivitySchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  type: { type: String, required: true },
  durationMinutes: { type: Number, default: 0 },
  calories: { type: Number, default: 0 },
  points: { type: Number, default: 0 },
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Activity', ActivitySchema);
