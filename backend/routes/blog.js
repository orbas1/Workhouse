const express = require('express');
const validate = require('../middleware/validate');
const { categoryQuerySchema, postIdParamSchema } = require('../validation/blog');
const { listPosts, listCategories, getPostHandler } = require('../controllers/blog');

const router = express.Router();

router.get('/posts', validate(categoryQuerySchema, 'query'), listPosts);
router.get('/categories', listCategories);
router.get('/posts/:id', validate(postIdParamSchema, 'params'), getPostHandler);

module.exports = router;
