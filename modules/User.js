const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
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

  resetPasswordToken: {
    type: String,
  },
  resetPasswordExpires: {
    type: Date,
  },
  title: {
    type: String,
  },
  occupation: {
    type: String,
  },
  phone: {
    type: String,
  },
  comments: {
    type: String,
  },
  partner: {
    type: Boolean,
  },
  planner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'planners',
  },
});

module.exports = mongoose.model('users', UserSchema);
