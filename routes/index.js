const express = require('express');
const router = express.Router();
const mongo = require('mongodb').MongoClient;
const objectId = require('mongodb').ObjectID;
require("../models/post");
require('../models/db');
const controller = require('../controller/controller');

const url = 'mongodb://sak2:sak474@ds014648.mlab.com:14648/illuminate';

/* GET the home page. This contains links to the parts of the projects */
router.get('/', controller.home);


/* Because the purpose of this week's deliverable was to show that
   we can build a fully functional backend that uses REST and the
   database,
   we get all the other planned functionality and redirect it
   to a coming soon page. (There is nothing more required for this
   week's deliverable that we had left to demonstrate in them,
   it'll be done by next week :)
 */
router.get('/about', function(req, res) {
    res.redirect('/coming-soon');
});
router.get('/wiki', function(req, res) {
    res.redirect('/coming-soon');
});
router.get('/petitions', function(req, res) {
    res.redirect('/coming-soon');
});
router.get('/coming-soon', controller.pageUnderConstruction);

/* the remaining GET requests */
router.get('/forum', controller.viewAll);

router.get('/submit', controller.submit);

router.get('/forum/:id', controller.viewPost);

router.get('/forum/:id/edit?', controller.editor);

/* removing an existing post, submitting a new post and
   updating posts, done via the following POST requests
 */
router.post('/remove', controller.removePost);

router.post('/submit', controller.createPost);

router.post('/update', controller.edit);

module.exports = router;
