const Profile = require('../models/Profile');
const User = require('../models/User');
const validateProfileInput = require('../validation/profile');
const validateExperienceInput = require('../validation/experience');
const validateEducationInput = require('../validation/education');

// @route   GET api/profile
// @desc    Get current users profile
// @access  Private
const getCurrentProfile = (req, res) => {
  getProfile(req, res, Profile.findOne({ user: req.user.id }));
};

// @route   GET api/profile/all
// @desc    Get all profiles
// @access  Public
const getAllProfiles = (req, res) => {
  getProfile(req, res, Profile.find());
};

const getProfile = (req, res, find) => {
  const errors = {};
  find
    .populate('user', ['name', 'avatar'])
    .then(profile => {
      if (!profile) {
        errors.noprofile = 'No profile found';
        return res.status(404).json(errors);
      }
      res.json(profile);
    })
    .catch(err => res.status(404).json(err));
};

// @route   GET api/profile/handle/:handle
// @desc    Get profile by handle
// @access  Public
const getProfileByHandle = (req, res) => {
  const errors = {};

  let u;
  if (req.params.handle.length >= 24) u = Profile.findOne({ user: req.params.handle });
  else u = Profile.findOne({ handle: req.params.handle });

  u
    .populate('user', ['name', 'avatar'])
    .then(profile => {
      if (!profile) {
        errors.noprofile = 'There is no profile for this user';
        res.status(404).json(errors);
      }
      res.json(profile);
    })
    .catch(err => res.status(404).json(err));
};

// @route   POST api/profile
// @desc    Create or edit user profile
// @access  Private
const updateProfile = (req, res) => {
  const { errors, isValid } = validateProfileInput(req.body);

  // Return any errors with 400 status
  if (!isValid) return res.status(400).json(errors);

  // Get fields
  const profileFields = {};
  profileFields.user = req.user.id;
  if (req.body.handle) profileFields.handle = req.body.handle;
  if (req.body.company) profileFields.company = req.body.company;
  if (req.body.website) profileFields.website = req.body.website;
  if (req.body.location) profileFields.location = req.body.location;
  if (req.body.bio) profileFields.bio = req.body.bio;
  if (req.body.status) profileFields.status = req.body.status;
  if (req.body.githubusername) {
    profileFields.githubusername = req.body.githubusername;
  }
  if (typeof req.body.skills !== 'undefined') profileFields.skills = req.body.skills.split(',');

  // Social
  profileFields.social = {};
  if (req.body.youtube) profileFields.social.youtube = req.body.youtube;
  if (req.body.twitter) profileFields.social.twitter = req.body.twitter;
  if (req.body.facebook) profileFields.social.facebook = req.body.facebook;
  if (req.body.linkedin) profileFields.social.linkedin = req.body.linkedin;
  if (req.body.instagram) profileFields.social.instagram = req.body.instagram;

  Profile.findOne({ user: req.user.id }).then(profile => {
    if (profile) {
      // Update
      Profile.findOneAndUpdate({ user: req.user.id }, { $set: profileFields }, { new: true }).then(profile => res.json(profile));
    } else {
      // Check if handle exists
      Profile.findOne({ handle: profileFields.handle }).then(profile => {
        if (profile) {
          errors.handle = 'That handle already exists';
          res.status(400).json(errors);
        }
        // Save Profile
        new Profile(profileFields).save().then(profile => res.json(profile));
      });
    }
  });
};

// @route   POST api/profile/experience
// @desc    Add experience to profile
// @access  Private
const addExperience = (req, res) => {
  const { errors, isValid } = validateExperienceInput(req.body);

  // Return any errors with 400 status
  if (!isValid) return res.status(400).json(errors);

  Profile.findOne({ user: req.user.id }).then(profile => {
    const newExp = {
      title: req.body.title,
      company: req.body.company,
      location: req.body.location,
      from: req.body.from,
      to: req.body.to,
      current: req.body.current,
      description: req.body.description
    };

    // Add experience to the array in the begining
    profile.experience.unshift(newExp);
    profile.save().then(profile => res.json(profile));
  });
};

// @route   POST api/profile/education
// @desc    Add education to profile
// @access  Private
const addEducation = (req, res) => {
  const { errors, isValid } = validateEducationInput(req.body);

  // Return any errors with 400 status
  if (!isValid) return res.status(400).json(errors);

  Profile.findOne({ user: req.user.id }).then(profile => {
    const newEdu = {
      school: req.body.school,
      degree: req.body.degree,
      fieldofstudy: req.body.fieldofstudy,
      from: req.body.from,
      to: req.body.to,
      current: req.body.current,
      description: req.body.description
    };

    // Add education to the array in the begining
    profile.education.unshift(newEdu);
    profile.save().then(profile => res.json(profile));
  });
};

const deleteCredentials = (req, res, credential) => {
  Profile.findOne({ user: req.user.id })
    .then(profile => {
      // Get remove index, Splice out of array and save
      const cred = credential(profile);
      const removeIndex = cred.map(item => item.id).indexOf(req.params.id);
      cred.splice(removeIndex, 1);
      profile.save().then(profile => res.json(profile));
    })
    .catch(err => res.status(404).json(err));
};

// @route   DELETE api/profile/experience/:exp_id
// @desc    Delete experience from profile
// @access  Private
const deleteExperience = (req, res) => {
  deleteCredentials(req, res, profile => profile.experience);
};
// @route   DELETE api/profile/education/:edu_id
// @desc    Delete education from profile
// @access  Private
const deleteEducation = (req, res) => {
  deleteCredentials(req, res, profile => profile.education);
};

// @route   DELETE api/profile
// @desc    Delete user and profile
// @access  Private
const deleteProfile = (req, res) => {
  Profile.findOneAndRemove({ user: req.user.id }).then(() => {
    User.findOneAndRemove({ _id: req.user.id }).then(() => res.json({ success: true }));
  });
};

module.exports = {
  getCurrentProfile,
  getAllProfiles,
  getProfileByHandle,
  updateProfile,
  addExperience,
  addEducation,
  deleteExperience,
  deleteEducation,
  deleteProfile
};
