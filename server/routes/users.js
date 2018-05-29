const express = require('express');
const passport = require('passport');
const users = require('../controllers/users');

const router = express.Router();
const authenticate = passport.authenticate('jwt', { session: false });

router.post('/api/users/register', users.registerUser);
router.post('/api/users/login', users.loginUser);
router.get('/api/users/current', authenticate, users.getCurrentUser);

module.exports = router;
