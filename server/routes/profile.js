const express = require('express');
const passport = require('passport');
const profile = require('../controllers/profile');

const router = express.Router();
const authenticate = passport.authenticate('jwt', { session: false });

router.get('/api/profile', authenticate, profile.getCurrentProfile);
router.get('/api/profile/all', profile.getAllProfiles);
router.get('/api/profile/handle/:handle', profile.getProfileByHandle);
router.post('/api/profile', authenticate, profile.updateProfile);
router.post('/api/profile/experience', authenticate, profile.addExperience);
router.post('/api/profile/education', authenticate, profile.addEducation);
router.delete('/api/profile/experience/:id', authenticate, profile.deleteExperience);
router.delete('/api/profile/education/:id', authenticate, profile.deleteEducation);
router.delete('/api/profile', authenticate, profile.deleteProfile);

module.exports = router;
