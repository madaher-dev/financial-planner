const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const { check, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const config = require('config');
const auth = require('../middleware/auth');
const User = require('../modules/User');
const nodemailer = require('nodemailer');
var crypto = require('crypto');

// @route   GET api/auth
// @desc    Get logged in user
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    if (user.type === 'Admin') {
      res.json({ user, admin: true });
    } else {
      res.json({ user, admin: false });
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   Post api/users
// @desc    Auth user & get tocken
// @access  Public

router.post(
  '/',
  [
    check('email', 'Please include a valid email').isEmail(),
    check(
      'password',
      'Please enter a password with 6 or more characters'
    ).exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;
    try {
      let user = await User.findOne({ email });
      if (!user) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'Invalid Credentials' }] });
      }
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'Invalid Credentials' }] });
      }
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
          if (user.type === 'Admin') {
            res.json({ token: { token }, admin: true });
          } else {
            res.json({ token: { token }, admin: false });
          }
        }
      );
    } catch (err) {
      console.log(err.message);
      res.status(500).send('Server Error');
    }
  }
);

//test

router.route('/test').put(function (req, res) {
  User.findByIdAndUpdate(
    '5ef488ba3ccd3906b094e080',
    { password: '000009' },
    function (err, result) {
      if (err) {
        res.send(err);
      } else {
        res.send(result);
      }
    }
  );
});

// @route   Post api/users/forgot
// @desc    Check if User Exists and Send Email
// @access  Public

router.put(
  '/forgot',
  [check('email', 'Please include a valid email').isEmail()],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { email } = req.body;
    try {
      let user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({
          errors: [
            {
              msg:
                'That email addrss is not recognized. Please try again or register for a new account ',
            },
          ],
        });
      }

      var email_token = crypto.randomBytes(64).toString('hex');

      const payload = {
        resetPasswordToken: email_token,
        resetPasswordExpires: Date.now() + 3600000,
      };

      const result = await User.findByIdAndUpdate(
        user.id,
        { $set: payload },
        { new: true }
      );

      const transporter = nodemailer.createTransport({
        host: 'mail.butula.net',
        port: 587,
        secure: false, // upgrade later with STARTTLS
        auth: {
          user: config.get('EMAIL_ADDRESS'),
          pass: config.get('EMAIL_PASSWORD'),
        },
        tls: {
          rejectUnauthorized: false,
        },
      });

      const mailOptions = {
        from: 'info@butula.net',
        to: `${user.email}`,
        // to: 'madaher@alumni.ie.edu',
        subject: 'Link To Reset Password',
        text:
          'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n' +
          'Please click on the following link, or paste this into your browser to complete the process within one hour of receiving it:\n\n' +
          `http://localhost:3000/reset/${email_token}\n\n` +
          'If you did not request this, please ignore this email and your password will remain unchanged.\n',
      };

      console.log('sending mail');

      transporter.sendMail(mailOptions, (err, response) => {
        if (err) {
          console.error('there was an error: ', err);
        } else {
          console.log('here is the res: ', response);
          return res.status(200).json('recovery email sent');
        }
      });
    } catch (err) {
      console.log(err.message);
      return res.status(500).json({ errors: [{ msg: 'Server Error' }] });
    }
  }
);

module.exports = router;
