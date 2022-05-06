var express = require('express');
var router = express.Router();
var postController = require('../controllers/postController');

/* post */
router.get('/', postController.getAllPosts);

router.post('/', postController.createPost);

router.patch('/:id', postController.updatePost);

router.delete('/:id', postController.deletePost);

router.delete('/', postController.deleteAllPosts);

module.exports = router;
