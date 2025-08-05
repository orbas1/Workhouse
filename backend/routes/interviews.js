const express = require('express');
const { authenticate } = require('../middleware/auth');
const validate = require('../middleware/validate');
const { scheduleInterviewSchema, noteSchema } = require('../validation/interview');
const {
  scheduleInterviewHandler,
  getInterviewHandler,
  addNoteHandler,
} = require('../controllers/interview');

const router = express.Router();

router.post('/schedule', authenticate, validate(scheduleInterviewSchema), scheduleInterviewHandler);
router.get('/:id', authenticate, getInterviewHandler);
router.post('/:id/notes', authenticate, validate(noteSchema), addNoteHandler);

module.exports = router;
