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
    const planners = await Planner.find().sort({
      date: -1,
    });
    res.json(planners);
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   POST api/planners/edit
// @desc    Edit a planner
// @access  Public
router.post(
  '/edit',
  [
    check('name', 'Please include a name').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
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
      planner = await Planner.findByIdAndUpdate(
        id,
        { $set: plannerFields },
        { new: true }
      );
      res.json(planner);
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
    const planners = await Planner.find({ type: 'Planner' }).sort({
      date: -1,
    });
    res.json(planners);
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   DELETE api/contacts/:id
// @desc    Delete a contact Contact
// @access  Private
router.delete('/:id', auth, async (req, res) => {
  try {
    let planner = await Planner.findById(req.params.id);
    if (!planner) return res.status(404).json({ msg: 'Planner not found' });

    // // Make sure is Admin
    // if (req.user.id) {
    //   return res.status(401).json({ msg: 'Not Authorized' });
    // }

    await Planner.findByIdAndRemove(req.params.id);
    res.json({ msg: 'Planner Removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});
module.exports = router;
