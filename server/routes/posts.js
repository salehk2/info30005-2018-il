const express = require('express');
const passport = require('passport');
const posts = require('../controllers/posts');

const router = express.Router();
const authenticate = passport.authenticate('jwt', { session: false });

router.get('/api/posts', posts.getPosts);
router.get('/api/posts/:id', posts.getPostById);
router.post('/api/posts', authenticate, posts.addPost);
router.delete('/api/posts/:id', authenticate, posts.deletePost);
router.post('/api/posts/like/:id', authenticate, posts.likePost);
router.post('/api/posts/unlike/:id', authenticate, posts.unlikePost);
router.post('/api/posts/comment/:id', authenticate, posts.addComment);
router.delete('/api/posts/comment/:id/:comment_id', authenticate, posts.deleteComment);

module.exports = router;
