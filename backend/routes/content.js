const express = require('express');
const auth = require('../middleware/auth');
const validate = require('../middleware/validate');
const { createContentSchema, updateContentSchema } = require('../validation/content');
const {
  createContentHandler,
  listContentHandler,
  updateContentHandler,
  deleteContentHandler,
} = require('../controllers/content');

const router = express.Router();

router.post('/create', auth, validate(createContentSchema), createContentHandler);
router.get('/', auth, listContentHandler);
router.put('/:id', auth, validate(updateContentSchema), updateContentHandler);
router.delete('/:id', auth, deleteContentHandler);

module.exports = router;
