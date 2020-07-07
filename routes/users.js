const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const { check, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const config = require('config');
const User = require('../modules/User');
const Planner = require('../modules/Planner');
const auth = require('../middleware/auth');

// @route   POST api/users
// @desc    Add a User by a Planner or Admin
// @access  Private
router.post(
  '/add',
  [
    auth,
    [
      check('firstName', 'Please include a first name').not().isEmpty(),
      check('lastName', 'Please include a family name').not().isEmpty(),
      check('email', 'Please include a valid email').isEmail(),
      check(
        'password',
        'Please enter a password with 6 or more characters'
      ).isLength({ min: 6 }),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
      });
    }
    const {
      firstName,
      lastName,
      email,
      password,
      title,
      occupation,
      phone,
      comments,
      partner,
      useDefaultSettings,
    } = req.body;
    try {
      // check if request sent by an admin or planner (from token)
      planner = await Planner.findById(req.user.id);
      if (!planner) {
        return res.status(401).json({ errors: [{ msg: 'Unauthorized' }] });
      }
      let user = await User.findOne({ email });

      if (user) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'User already exists' }] });
      }

      user = new User({
        lastName,
        firstName,
        email,
        password,
        title,
        occupation,
        partner,
        phone,
        comments,
        useDefaultSettings,
      });

      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
      user.planner = req.user.id;
      await user.save();

      const payload = {
        user: {
          id: user.id,
        },
      };
      jwt.sign(
        payload,
        config.get('jwtSecret'),
        { expiresIn: 360000 },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);
// @route   GET api/users/all
// @desc    Get all Users for Admins
// @access  Private
router.get('/all', auth, async (req, res) => {
  try {
    // check if user is an admin (from token) and show all planners
    user = await Planner.findById(req.user.id);

    if (user.type === 'Admin') {
      const users = await User.find().sort({
        date: -1,
      });

      res.json(users);
    } else res.status(401).json({ msg: 'Unauthorized' });
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET api/users/users
// @desc    Get users added by specific planer
// @access  Private
router.get('/sub', auth, async (req, res) => {
  try {
    // check if user is a planner  (from token) and show all users created by them
    user = await Planner.findById(req.user.id);

    if (user.type === 'Planner') {
      const users = await User.find({ planner: req.user.id }).sort({
        date: -1,
      });
      res.json(users);
    } else res.status(401).json({ msg: 'Unauthorized' });
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   POST api/users/edit
// @desc    Edit a User
// @access  Private
router.post(
  '/edit',
  [
    auth,
    [
      check('firstName', 'Please include a first name').not().isEmpty(),
      check('lastName', 'Please include a family name').not().isEmpty(),
      check('email', 'Please include a valid email').isEmail(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
      });
    }

    const {
      firstName,
      lastName,
      email,
      id,
      title,
      occupation,
      partner,
      phone,
      comments,
      planner,
      useDefaultSettings,
    } = req.body;
    const userFields = {};
    if (firstName) userFields.firstName = firstName;
    if (lastName) userFields.lastName = lastName;
    if (email) userFields.email = email;
    if (phone) userFields.phone = phone;
    if (title) userFields.title = title;
    if (occupation) userFields.occupation = occupation;
    if (comments) userFields.comments = comments;
    userFields.partner = partner;
    userFields.useDefaultSettings = useDefaultSettings;

    try {
      // check if user is an admin or a planner (from token)
      user = await Planner.findById(req.user.id);

      if (user.type === 'Admin') {
        user = await User.findByIdAndUpdate(
          id,
          { $set: userFields },
          { new: true }
        );
        res.json(user);
      } else if (user.type === 'Planner' && planner === user.id) {
        user = await User.findByIdAndUpdate(
          id,
          { $set: userFields },
          { new: true }
        );
        res.json(user);
      } else res.status(401).json({ msg: 'Unauthorized' });
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route   DELETE api/user/:id
// @desc    Delete a user
// @access  Private
router.delete('/:id', auth, async (req, res) => {
  try {
    // check if user is an admin or planner (from token)
    planner = await Planner.findById(req.user.id);

    if (planner) {
      let user = await User.findById(req.params.id);
      if (!user) return res.status(404).json({ msg: 'User not found' });

      await User.findByIdAndRemove(req.params.id);
      res.json({ msg: 'User Removed' });
    } else res.status(401).json({ msg: 'Unauthorized' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});
module.exports = router;
