const mongoose = require('mongoose');

const SettingsSchema = mongoose.Schema({
  ageAtDeath: {
    type: Number,
    required: true,
  },
  costInflation: {
    type: Number,
    required: true,
  },
  edInflation: {
    type: Number,
    required: true,
  },
  timeHorizon: {
    type: Number,
    required: true,
  },
  modelYearEnd: {
    type: Number,
    required: true,
  },
  mpaCashSTD: {
    type: Number,
    required: true,
  },
  mpaLTD: {
    type: Number,
    required: true,
  },
  mpaEquities: {
    type: Number,
    required: true,
  },
  cmeCashSTD: {
    type: Number,
    required: true,
  },
  cmeLTD: {
    type: Number,
    required: true,
  },
  cmeEquities: {
    type: Number,
    required: true,
  },
  expectedReturn: {
    type: Number,
    required: true,
  },
  childrenAgeStart: {
    type: Number,
    required: true,
  },
  childrenNumYearsSchool: {
    type: Number,
    required: true,
  },
  childrenSchoolEnd: {
    type: Number,
    required: true,
  },
  childrenNumYearsUni: {
    type: Number,
    required: true,
  },
  childrenUniEnd: {
    type: Number,
    required: true,
  },
  goalOne: {
    type: Number,
    required: true,
  },
  goalTwo: {
    type: Number,
    required: true,
  },
  goalThree: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('settings', SettingsSchema);
