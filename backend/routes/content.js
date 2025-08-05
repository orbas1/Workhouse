const express = require('express');
const auth = require('../middleware/auth');
const validate = require('../middleware/validate');
const { createContentSchema } = require('../validation/content');
const { createContentHandler, listContentHandler } = require('../controllers/content');

const router = express.Router();

router.post('/create', auth, validate(createContentSchema), createContentHandler);
router.get('/', auth, listContentHandler);

module.exports = router;
