const express = require('express');
const auth = require('../middleware/auth');
const validate = require('../middleware/validate');
const { createContentSchema, updateContentSchema } = require('../validation/content');
const {
  createContentHandler,
  listContentHandler,
  updateContentHandler,
const requireRole = require('../middleware/requireRole');
const {
  createContentSchema,
  updateContentStatusSchema,
} = require('../validation/content');
const {
  createContentHandler,
  listContentHandler,
  updateContentStatusHandler,
  deleteContentHandler,
} = require('../controllers/content');

const router = express.Router();

router.post('/create', auth, validate(createContentSchema), createContentHandler);
router.get('/', auth, listContentHandler);
router.put('/:id', auth, validate(updateContentSchema), updateContentHandler);
router.delete('/:id', auth, deleteContentHandler);
router.get('/', auth, requireRole('admin', 'content-manager'), listContentHandler);
router.patch(
  '/:id/status',
  auth,
  requireRole('admin', 'content-manager'),
  validate(updateContentStatusSchema),
  updateContentStatusHandler
);
router.delete('/:id', auth, requireRole('admin'), deleteContentHandler);

module.exports = router;
