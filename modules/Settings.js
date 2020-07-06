const mongoose = require('mongoose');
// Make Mongoose use `findOneAndUpdate()`. Note that this option is `true`
// by default, you need to set it to false.
mongoose.set('useFindAndModify', false);

const SettingsSchema = mongoose.Schema({
  ageAtDeath: {
    type: Number,
    required: true,
    default: 60,
  },
  costInflation: {
    type: Number,
    required: true,
    default: 0,
  },
  eduInflation: {
    type: Number,
    required: true,
    default: 0,
  },
  timeHorizon: {
    type: Number,
    required: true,
    default: 0,
  },
  modelYearEnd: {
    type: Date,
    required: true,
    default: '2078-01-01T00:00:00.000+00:00',
  },
  mpaCashSTD: {
    type: Number,
    required: true,
    default: 0,
  },
  mpaLTD: {
    type: Number,
    required: true,
    default: 0,
  },
  mpaEquities: {
    type: Number,
    required: true,
    default: 0,
  },
  cmeCashSTD: {
    type: Number,
    required: true,
    default: 0,
  },
  cmeLTD: {
    type: Number,
    required: true,
    default: 0,
  },
  cmeEquities: {
    type: Number,
    required: true,
    default: 0,
  },
  expectedReturn: {
    type: Number,
    required: true,
    default: 0,
  },
  childrenAgeStart: {
    type: Number,
    required: true,
    default: 0,
  },
  childrenNumYearsSchool: {
    type: Number,
    required: true,
    default: 0,
  },
  childrenSchoolEnd: {
    type: Number,
    required: true,
    default: 0,
  },
  childrenNumYearsUni: {
    type: Number,
    required: true,
    default: 0,
  },
  childrenUniEnd: {
    type: Number,
    required: true,
    default: 0,
  },
  goalOne: {
    type: String,
    required: true,
  },
  goalTwo: {
    type: String,
    required: true,
  },
  goalThree: {
    type: String,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'planners',
  },
});

module.exports = mongoose.model('settings', SettingsSchema);
