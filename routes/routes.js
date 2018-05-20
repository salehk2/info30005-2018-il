const express = require('express');
const controller = require('../controllers/posts_api.js');

const router = express.Router();

router.get('/', controller.getDefault);
router.get('/api/posts', controller.getPosts);
router.get('/api/posts/:_id', controller.getPost);
router.post('/api/posts', controller.addPost);
router.put('/api/posts/:_id', controller.updatePost);
router.delete('/api/posts/:_id', controller.removePost);

module.exports = router;
