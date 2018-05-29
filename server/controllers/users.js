const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const gravatar = require('gravatar');

const keys = require('../config/keys');
const User = require('../models/User');
const validateRegisterInput = require('../validation/register');
const validateLoginInput = require('../validation/login');
const getRandomAvatar = require('../utils/getRandomAvatar');

// @route  GET api/users/register
// @desc   Register user
// @access Public
const registerUser = (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body);

  if (!isValid) return res.status(400).json(errors);

  // Create user if not exists and use their gravatar
  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      errors.email = 'Email already exists';
      return res.status(400).json(errors);
    } else {
      // use a random avatar if email has no gravatar
      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        avatar: gravatar.url(req.body.email, { s: '200', r: 'pg', d: getRandomAvatar() }),
        password: req.body.password
      });

      // store hashed password with auto generated salt
      bcrypt.hash(newUser.password, 10, (err, hash) => {
        if (err) throw err;
        newUser.password = hash;
        newUser
          .save()
          .then(user => res.json(user))
          .catch(err => console.log(err));
      });
    }
  });
};

// @route  GET api/users/login
// @desc   Login user and return JWT Token
// @access Public
const loginUser = (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body);

  if (!isValid) return res.status(400).json(errors);

  const email = req.body.email;
  const password = req.body.password;

  // find user by email
  User.findOne({ email }).then(user => {
    if (!user) {
      errors.email = 'User not found';
      return res.status(404).json(errors);
    }

    // compare password
    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        // create jwt payload
        const payload = { id: user.id, name: user.name, avatar: user.avatar };

        // Sign token
        jwt.sign(payload, keys.secretOrKey, { expiresIn: 3600 }, (err, token) => {
          if (err) throw err;
          res.json({ success: true, token: 'Bearer ' + token });
        });
      } else {
        errors.password = 'Password incorrect';
        return res.status(400).json(errors);
      }
    });
  });
};

// @route   GET api/users/current
// @desc    Return current user
// @access  Private
const getCurrentUser = (req, res) => {
  res.json({
    id: req.user.id,
    name: req.user.name,
    email: req.user.email
  });
};

module.exports = {
  registerUser,
  loginUser,
  getCurrentUser
};
