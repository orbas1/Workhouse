const express = require('express');
const auth = require('../middleware/auth');
const authorize = require('../middleware/authorize');
const validate = require('../middleware/validate');
const { classroomIdParamSchema, messageSchema } = require('../validation/classroomMessages');
const { createMessage, getMessagesHandler } = require('../controllers/classroomMessages');

const router = express.Router();

router.post(
  '/:classroomId/message',
  auth,
  authorize(['student', 'educator']),
  validate(classroomIdParamSchema, 'params'),
  validate(messageSchema),
  createMessage
);

router.get(
  '/:classroomId/messages',
  auth,
  authorize(['student', 'educator']),
  validate(classroomIdParamSchema, 'params'),
  getMessagesHandler
);

module.exports = router;
