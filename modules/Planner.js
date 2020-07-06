const mongoose = require('mongoose');
// Make Mongoose use `findOneAndUpdate()`. Note that this option is `true`
// by default, you need to set it to false.
mongoose.set('useFindAndModify', false);

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
    default: '10',
  },
  company: {
    type: String,
    default: 'Independent Planner',
  },
  phone: {
    type: String,
  },
  comments: {
    type: String,
  },
});

module.exports = mongoose.model('planners', PlannerSchema);
