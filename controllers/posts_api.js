const Post = require('../models/post.js');

const getDefault = function (req, res) {
  res.send('Please use api/posts');
};

const getPosts = function (req, res) {
  Post.getPosts(function (err, posts) {
    if (err) throw err;
    res.send(posts);
  });
};

const getPost = function (req, res) {
  Post.getPostById(req.params._id, function (err, post) {
    if (err) throw err;
    res.send(post);
  });
};

const addPost = function (req, res) {
  const post = req.body;
  Post.addPost(post, function (err, post) {
    if (err) throw err;
    res.send(post);
  });
};

const updatePost = function (req, res) {
  const post = req.body;
  Post.updatePost(req.params._id, post, {}, function (err, post) {
    if (err) throw err;
    res.send(post);
  });
};

const removePost = function (req, res) {
  Post.removePost(req.params._id, function (err, post) {
    if (err) throw err;
    res.send(post);
  });
};

module.exports = {
  getDefault,
  getPosts,
  getPost,
  addPost,
  updatePost,
  removePost
};
