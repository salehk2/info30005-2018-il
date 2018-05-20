const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  post_text: {
    type: String,
    required: true
  },
  image_url: {
    type: String,
    default: 'https://goo.gl/qhkyyZ'
  },
  create_date: {
    type: Date,
    default: Date.now
  }
});

const Post = mongoose.model('Posts', postSchema);

const getPosts = function (callback, limit) {
  Post.find(callback).limit(limit);
};

const getPostById = function (id, callback) {
  Post.findById(id, callback);
};

const addPost = function (post, callback) {
  Post.create(post, callback);
};

const updatePost = function (id, post, options, callback) {
  const query = { _id: id };
  const update = {
    title: post.title,
    post_text: post.post_text,
    image_url: post.image_url
  };
  Post.findOneAndUpdate(query, update, options, callback);
};

const removePost = function (id, callback) {
  const query = { _id: id };
  Post.remove(query, callback);
};

module.exports = {
  Post,
  getPosts,
  getPostById,
  addPost,
  updatePost,
  removePost
};
