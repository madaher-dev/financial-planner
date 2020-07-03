const mongoose = require('mongoose');

const PlannerSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  type: {
    type: String,
    default: 'Planner',
  },
  resetPasswordToken: {
    type: String,
  },
  resetPasswordExpires: {
    type: Date,
  },
  title: {
    type: String,
  },
  company: {
    type: String,
  },
  phone: {
    type: String,
  },
  comments: {
    type: String,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'planners',
  },
});

module.exports = mongoose.model('planners', PlannerSchema);
