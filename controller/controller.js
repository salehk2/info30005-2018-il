var express = require('express');
var router = express.Router();
var mongo = require('mongodb').MongoClient;
var objectId = require('mongodb').ObjectID;
var mongoose = require('mongoose');
var assert = require('assert');

/* Contains functions used by the router to render the web page
 using data from mongo */

// used to connect to mongo
var Post = mongoose.model('Post');
var url = 'mongodb://sak2:sak474@ds014648.mlab.com:14648/illuminate';

// Show all posts from the database
var viewAll = function (req, res, next) {
  var resultArray = [];
  mongo.connect(url, function (err, db) {
    assert.equal(null, err);
    var cursor = db.collection('user-data').find();
    cursor.forEach(function (doc, err) {
      assert.equal(null, err);
      resultArray.push(doc);
    }, function () {
      db.close();
      res.render('forum', { items: resultArray });
    });
  });
};

// Create a new post using the predifined schema
var createPost = function (req, res) {
  var post = new Post({
    'title': req.body.title,
    'content': req.body.content,
    'author': req.body.author
  });
  mongo.connect(url, function (err, db) {
    assert.equal(null, err);
    db.collection('user-data').insertOne(post, function (err, result) {
      assert.equal(null, err);
      console.log('Item inserted');
      alert('Posted Successfully!');
      db.close();
    });
  });
  console.log('reached here');
  res.redirect('/forum');
};

// Remove the post with the given id
var removePost = function (req, res, next) {
  var id = req.body.id;

  mongo.connect(url, function (err, db) {
    assert.equal(null, err);
    db.collection('user-data').deleteOne({ '_id': objectId(id) }, function (err, result) {
      assert.equal(null, err);
      console.log('Item deleted');
      db.close();
    });
  });
};

// view a single post with the given id
var viewPost = function (req, res) {
  var id = req.params.id;
  console.log('okayyy\n\n');
  var resultArray = [];
  mongo.connect(url, function (err, db) {
    assert.equal(null, err);
    var cursor = db.collection('user-data').find({ '_id': objectId(id) });
    cursor.forEach(function (doc, err) {
      resultArray.push(doc);
    }, function () {
      db.close();
      res.render('post', { items: resultArray });
    });
  });
};

// Render the page to edit a post
var editor = function (req, res) {
  var id = req.params.id;
  console.log(id);
  res.render('edit', { id });
};

// Edit the given post
var edit = function (req, res, next) {
  var item = {
    title: req.body.title,
    content: req.body.content,
    author: req.body.author
  };
  var id = req.body.id;

  mongo.connect(url, function (err, db) {
    assert.equal(null, err);
    db.collection('user-data').updateOne({ '_id': objectId(id) }, { $set: item }, function (err, result) {
      assert.equal(null, err);
      console.log('Item updated');
      db.close();
    });
  });
  console.log('update');
  res.send('<script>\n' +
    '    window.close();\n' +
    '</script>');
};

var submit = function (req, res) {
  res.render('submit');
};

var home = function (req, res) {
  res.render('home');
};

var pageUnderConstruction = function (req, res) {
  res.render('coming soon');
};

// Exports used by router
module.exports.createPost = createPost;
module.exports.viewAll = viewAll;
module.exports.submit = submit;
module.exports.viewPost = viewPost;
module.exports.removePost = removePost;
module.exports.edit = edit;
module.exports.editor = editor;
module.exports.home = home;
module.exports.pageUnderConstruction = pageUnderConstruction;
