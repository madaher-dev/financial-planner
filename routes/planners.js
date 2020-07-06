const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const { check, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const config = require('config');
const Planner = require('../modules/Planner');
const auth = require('../middleware/auth');

// @route   POST api/planners
// @desc    Register a planner
// @access  Public
router.post(
  '/',
  [
    check('name', 'Please include a name').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check(
      'password',
      'Please enter a password with 6 or more characters'
    ).isLength({ min: 6 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
      });
    }
    const { name, email, password, title, company, phone, comments } = req.body;
    try {
      let user = await Planner.findOne({ email });

      if (user) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'User already exists' }] });
      }

      // Notice there is not Type. Adding type will create security breach. Create new private route if needed
      user = new Planner({
        name,
        email,
        password,
        title,
        company,
        phone,
        comments,
      });

      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);

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
// @route   GET api/planners/planners
// @desc    Get all Planners
// @access  Private
router.get('/sub', auth, async (req, res) => {
  try {
    // check if user is an admin (from token) and show all planners
    user = await Planner.findById(req.user.id);

    if (user.type === 'Admin') {
      const planners = await Planner.find().sort({
        date: -1,
      });
      res.json(planners);
    } else res.status(401).json({ msg: 'Unauthorized' });
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET api/planners/planners
// @desc    Get Planner Name from ID
// @access  Private
router.post('/plannerName', auth, async (req, res) => {
  try {
    // check if user is an admin (from token) and show all planners
    user = await Planner.findById(req.user.id);

    if (user) {
      const planners = await Planner.findById(req.body.id, 'name');

      res.json(planners.name);
    } else res.status(401).json({ msg: 'Unauthorized' });
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   POST api/planners/edit
// @desc    Edit a planner
// @access  Private
router.post(
  '/edit',
  [
    auth,
    [
      check('name', 'Please include a name').not().isEmpty(),
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

    const { name, type, email, id, title, company, phone, comments } = req.body;
    const plannerFields = {};
    if (name) plannerFields.name = name;
    if (email) plannerFields.email = email;
    if (phone) plannerFields.phone = phone;
    if (type) plannerFields.type = type;
    if (title) plannerFields.title = title;
    if (company) plannerFields.company = company;
    if (comments) plannerFields.comments = comments;

    try {
      // check if user is an admin (from token)
      user = await Planner.findById(req.user.id);

      if (user.type === 'Admin') {
        planner = await Planner.findByIdAndUpdate(
          id,
          { $set: plannerFields },
          { new: true }
        );
        res.json(planner);
      } else res.status(401).json({ msg: 'Unauthorized' });
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route   DELETE api/planners/:id
// @desc    Delete a planner
// @access  Private
router.delete('/:id', auth, async (req, res) => {
  try {
    // check if user is an admin (from token)
    user = await Planner.findById(req.user.id);

    if (user.type === 'Admin') {
      let planner = await Planner.findById(req.params.id);
      if (!planner) return res.status(404).json({ msg: 'Planner not found' });

      await Planner.findByIdAndRemove(req.params.id);
      res.json({ msg: 'Planner Removed' });
    } else res.status(401).json({ msg: 'Unauthorized' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});
module.exports = router;
