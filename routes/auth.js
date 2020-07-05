const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const { check, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const config = require('config');
const auth = require('../middleware/auth');
const Planner = require('../modules/Planner');
const User = require('../modules/User');
const nodemailer = require('nodemailer');
var crypto = require('crypto');

// @route   GET api/auth
// @desc    Get logged in user (Login)
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
    const user = await Planner.findById(req.user.id).select('-password');
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
// @desc    Auth user & get tocken (Register)
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
      let user = await Planner.findOne({ email });
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

// @route   Post api/users/forgot
// @desc    Check if User Exists and Send Email (Forget Pass)
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
      let user = await Planner.findOne({ email });
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

      const addToken = await Planner.findByIdAndUpdate(
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

// @route   Post api/users/sendMail
// @desc    Send Reset New Planner Email
// @access  Public

router.put('/sendMail', async (req, res) => {
  const { email } = req.body;
  try {
    let user = await Planner.findOne({ email });

    var email_token = crypto.randomBytes(64).toString('hex');

    const payload = {
      resetPasswordToken: email_token,
    };

    const addToken = await Planner.findByIdAndUpdate(
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
      subject: 'Pringles: Planner Account Created',
      text:
        'You are receiving this because we have created a new Planner Account for you\n\n' +
        'Please click on the following link, or paste this into your browser to reset your password and complete the process :\n\n' +
        `http://localhost:3000/newplanner/${email_token}\n\n` +
        'If you did not request this, please ignore this email.\n',
    };

    console.log('sending mail');

    transporter.sendMail(mailOptions, (err, response) => {
      if (err) {
        console.error('there was an error: ', err);
      } else {
        console.log('here is the res: ', response);
        return res.status(200).json('new planner account email sent');
      }
    });
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({ errors: [{ msg: 'Server Error' }] });
  }
});

// @route   Post api/users/userSendMail
// @desc    Send Reset New User Email
// @access  Public

router.put('/userSendMail', async (req, res) => {
  const { email } = req.body;
  try {
    let user = await User.findOne({ email });

    var email_token = crypto.randomBytes(64).toString('hex');

    const payload = {
      resetPasswordToken: email_token,
    };

    const addToken = await User.findByIdAndUpdate(
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
      subject: 'Pringles: User Account Created',
      text:
        'You are receiving this because we have created a new Account for you on Pringles Financial Planner\n\n' +
        'Please click on the following link, or paste this into your browser to reset your password and complete the process :\n\n' +
        `http://localhost:3000/newuser/${email_token}\n\n` +
        'If you did not request this, please ignore this email.\n',
    };

    console.log('sending mail');

    transporter.sendMail(mailOptions, (err, response) => {
      if (err) {
        console.error('there was an error: ', err);
      } else {
        console.log('here is the res: ', response);
        return res.status(200).json('new User account email sent');
      }
    });
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({ errors: [{ msg: 'Server Error' }] });
  }
});
// @route   Post api/auth/reset
// @desc    Check if email token valid and return username
// @access  Public

router.get('/reset', async (req, res) => {
  const user = await Planner.findOne(
    {
      resetPasswordToken: req.query.resetPasswordToken,
      resetPasswordExpires: { $gt: Date.now() },
    },
    { email: 1 }
  );

  if (user == null) {
    //console.error('password reset link is invalid or has expired');
    return res
      .status(403)
      .send('password reset link is invalid or has expired');
  } else {
    return res.status(200).send({
      email: user.email,
      message: 'password reset link a-ok',
    });
  }
});
// @route   Post api/auth/resetPlanner
// @desc    Check if email token valid and return username for New Planner
// @access  Public

router.get('/resetPlanner', async (req, res) => {
  const user = await Planner.findOne(
    {
      resetPasswordToken: req.query.resetPasswordToken,
    },
    { email: 1 }
  );

  if (user == null) {
    //console.error('password reset link is invalid or has expired');
    return res.status(403).send('password reset link is invalid ');
  } else {
    return res.status(200).send({
      email: user.email,
      message: 'password reset link a-ok',
    });
  }
});

// @route   Post api/auth/updatePasswordViaEmail
// @desc    Update Password via email
// @access  Public (requires email token)

router.put(
  '/updatePasswordViaEmail',

  async (req, res) => {
    try {
      const user = await Planner.findOne(
        {
          email: req.body.email,
          resetPasswordToken: req.body.email_token,
        }
        // { email: 1 }
      );

      if (user == null) {
        console.error('password reset link is invalid or has expired');
        return res
          .status(403)
          .send('password reset link is invalid or has expired');
      } else if (user != null) {
        console.log('user exists in db');

        const payload = {
          password: null,
          resetPasswordToken: null,
          resetPasswordExpires: null,
        };

        const salt = await bcrypt.genSalt(10);
        payload.password = await bcrypt.hash(req.body.password, salt);

        const updatePass = await Planner.findByIdAndUpdate(
          user.id,
          { $set: payload },
          { new: true }
        );

        const payload2 = {
          user: {
            id: user.id,
          },
        };
        jwt.sign(
          payload2,
          config.get('jwtSecret'),
          { expiresIn: 360000 },
          (err, token) => {
            if (err) throw err;
            return res.json({ token });
          }
        );
      }
    } catch (err) {
      console.error('no user exists in db to update');
      return res.status(401).json('no user exists in db to update');
    }
  }
);

module.exports = router;
