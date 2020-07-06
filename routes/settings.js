const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Settings = require('../modules/Settings');
const Planner = require('../modules/Planner');

// @route   GET api/settings
// @desc    Get Global Settings
// @access  Public
router.get('/', async (req, res) => {
  try {
    const settings = await Settings.findById('5efdb3e3acb82da111116477');
    res.json(settings);
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET api/settings
// @desc    Get Global Settings
// @access  Private
router.get('/custom', auth, async (req, res) => {
  try {
    // Get Planner ID (from token)
    user = await Planner.findById(req.user.id);

    // Settings for user 111111111111111111aaaaaa are considered Global if no custom settings found load global

    let settings = await Settings.findOne({ user: user.id });
    if (!settings)
      settings = await Settings.findById('111111111111111111aaaaaa');
    res.json(settings);
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   POST api/settings/edit
// @desc    Edit Global Settings
// @access  Private
router.put('/edit', auth, async (req, res) => {
  const {
    ageAtDeath,
    costInflation,
    eduInflation,
    timeHorizon,
    modelYearEnd,
    mpaCashSTD,
    mpaLTD,
    mpaEquities,
    cmeCashSTD,
    cmeLTD,
    cmeEquities,
    expectedReturn,
    childrenAgeStart,
    childrenNumYearsSchool,
    childrenSchoolEnd,
    childrenNumYearsUni,
    childrenUniEnd,
    goalOne,
    goalTwo,
    goalThree,
  } = req.body;
  const settings = {};
  if (ageAtDeath) settings.ageAtDeath = ageAtDeath;
  if (costInflation) settings.costInflation = costInflation;
  if (eduInflation) settings.eduInflation = eduInflation;
  if (timeHorizon) settings.timeHorizon = timeHorizon;
  if (modelYearEnd) settings.modelYearEnd = modelYearEnd;
  if (mpaCashSTD) settings.mpaCashSTD = mpaCashSTD;
  if (mpaLTD) settings.mpaLTD = mpaLTD;
  if (mpaEquities) settings.mpaEquities = mpaEquities;
  if (cmeCashSTD) settings.cmeCashSTD = cmeCashSTD;
  if (cmeLTD) settings.cmeLTD = cmeLTD;
  if (cmeEquities) settings.cmeEquities = cmeEquities;
  if (expectedReturn) settings.expectedReturn = expectedReturn;
  if (childrenAgeStart) settings.childrenAgeStart = childrenAgeStart;
  if (childrenNumYearsSchool)
    settings.childrenNumYearsSchool = childrenNumYearsSchool;
  if (childrenSchoolEnd) settings.childrenSchoolEnd = childrenSchoolEnd;
  if (childrenNumYearsUni) settings.childrenNumYearsUni = childrenNumYearsUni;
  if (childrenUniEnd) settings.childrenUniEnd = childrenUniEnd;
  if (goalOne) settings.goalOne = goalOne;
  if (goalTwo) settings.goalTwo = goalTwo;
  if (goalThree) settings.goalThree = goalThree;

  try {
    // check if user is an admin (from token)
    user = await Planner.findById(req.user.id);

    if (user.type === 'Admin') {
      updated = await Settings.findByIdAndUpdate(
        '5efdb3e3acb82da111116477',
        { $set: settings },
        { new: true }
      );
      res.json(updated);
    } else {
      updated = await Settings.findOneAndUpdate(
        { user: user.id },
        { $set: settings },
        { new: true, upsert: true }
      );
      res.json(updated);
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});
module.exports = router;
