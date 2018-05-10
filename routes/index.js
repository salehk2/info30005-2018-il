var express = require('express');
var router = express.Router();
var mongo = require('mongodb').MongoClient;
var objectId = require('mongodb').ObjectID;
var assert = require('assert');
require("../models/post");
require('../models/db');
var controller = require('../controller/controller');

var url = 'mongodb://sak2:sak474@ds014648.mlab.com:14648/illuminate';

/* GET home page. */
router.get('/', function (req, res) {
    res.send('<html><h1>works</h1></html>');
});

router.get('/forum', controller.viewAll);

router.get('/submit', controller.submit);

router.post('/submit', controller.createPost);

router.post('/remove', controller.removePost);

router.get('/forum/:id', controller.viewPost);

router.get('/forum/:id/edit?', controller.editor);

router.post('/forum/:id/edit?', controller.edit);

module.exports = router;
